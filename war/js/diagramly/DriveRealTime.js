/*
 * $Id: DriveRealTime.js,v 1.33 2013/05/07 08:55:47 gaudenz Exp $
 * Copyright (c) 2011-2013, JGraph Ltd
 */
/**
 * Creates an object that synchronizes the graph model and given realtime model.
 * The session ID is used as a prefix in the model to produce unique IDs for new
 * cells.
 * 
 * See https://developers.google.com/drive/realtime/reference/gapi.drive.realtime
 */
function Sharing(graph, doc)
{
	this.graph = graph;
	this.model = graph.model;
	this.doc = doc;
	this.rt = doc.getModel();
	this.codec = new mxCodec();

	if (urlParams['reset'] == '1')
	{
		this.rt.getRoot().clear();
		this.log('RT Model reset');
	}
	
	this.init();

	this.log('Sharing started');
};

/**
 * Specifies if logging should be enabled. Default is false.
 */
Sharing.prototype.logging = false;

/**
 * Specifies if warnings should be printed to the console. Default is false.
 */
Sharing.prototype.warnings = false;

/**
 * Specifies the key of the root element in the model. Default is 0.
 */
Sharing.prototype.rootKey = '0';

/**
 * Reference to the collaborative map from cell IDs to maps, which in turn
 * contain the cell information and the children array. The parent, source,
 * and target entries are cell IDs.
 */
Sharing.prototype.cellMap = null;

Sharing.prototype.chatMap = null;

Sharing.prototype.selectionMap = null;

/**
 * True if a undoableEdit has been scheduled in <executeChange>.
 */
Sharing.prototype.scheduled = false;

/**
 * Synchronizes the collaboration model and the graph model and installs
 * the required listeners to keep them in sync.
 */
Sharing.prototype.init = function()
{
	this.log('Sharing initializing...');

	if (this.rt.getRoot().isEmpty())
	{
		this.initializeDocument();
	}
	else
	{
		this.initializeGraphModel();
		this.chatMap = this.rt.getRoot().get('chat');
		this.selectionMap = this.rt.getRoot().get('select');
	}
	
	if (this.chatMap == null)
	{
		this.initializeChat();
	}
	if (this.selectionMap == null)
	{
		this.initializeSelection();
	}

	// Adds a prefix for cell IDs
	var prefix = this.createPrefix();
	this.model.prefix = prefix + '-';

	// Installs the top-level listeners for syncing
	this.installDocumentListener();
	this.installGraphModelListener();
	this.installCollaboratorListener();
	this.installSelectionModelListener();
	this.installRemoteSelectionListener();
	this.updateCollaborators();
	
	// Changes that call endUpdate in a different thread to the one 
	// that started the update break the RT compound editing
	window.rtclient.editorUi.animate = false;
};

Sharing.prototype.initializeSelection = function() 
{
	if (this.selectionMap == null) 
	{
		this.rt.beginCompoundOperation();

		this.selectionMap = this.rt.createMap();
		this.rt.getRoot().set('select', this.selectionMap);
		mxLog.debug('RT: Selection list created');
		
		this.rt.endCompoundOperation();
	}
}	

Sharing.prototype.initializeChat = function() 
{
	if (this.chatMap == null) 
	{
		this.chatMap = this.rt.createMap();
		this.rt.getRoot().set('chat', this.chatMap);
		mxLog.debug('RT: Chat map created');
	}
}	

/**
 * Syncs initial state from graph model to collab model.
 */
Sharing.prototype.initializeDocument = function()
{
	// Creates an empty map from IDs to cells
	// and recursively adds cells to collab
	this.rt.beginCompoundOperation();
	
	// Avoids creating new map if called via root change
	if (this.cellMap == null)
	{
		// Initialize global mapping in RT root
		this.cellMap = this.rt.createMap();
		this.rt.getRoot().set('cells', this.cellMap);
		mxLog.debug('RT: Cell map created');
	}

	this.cellMap.clear();
	this.addCell(this.model.root);
	this.rt.endCompoundOperation();

	mxLog.debug('RT: Document initialized');
};

/**
 * Syncs initial state from collab model to graph model.
 */
Sharing.prototype.initializeGraphModel = function()
{
	// Makes sure the model is completely empty so that no IDs
	// are resolved to root or default layer on initial sync.
	this.model.cells = null;
	this.cellMap = this.rt.getRoot().get('cells');
	
	// Recursively add cells to graph model. By convention the root
	// cell always uses ID '0' to be able to restore the hierarchy.
	//mxLog.debug('reading cell hierarchy');
	var root = this.getCell(this.rootKey);
	
	//mxLog.debug('adding cell hierarchy');
	// Executes synchronously to update the initial state
	this.executeChange(new mxRootChange(this.model, root), true);

	mxLog.debug('RT: Graph model initialized');
};

/**
 * Returns true if the given event is local.
 */
Sharing.prototype.isLocalEvent = function(evt)
{
	return evt.isLocal;
};

/**
 * Adds the listener for added and removed cells in the collab model and maps
 * them to the graph model.
 */
Sharing.prototype.installDocumentListener = function()
{
	this.cellMap.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, mxUtils.bind(this, function(evt)
	{
		if (!this.isLocalEvent(evt))
		{
			//this.log('Value changed: key=' + key + ' oldValue=' + evt.oldValue + ' newValue=' + evt.newValue);
			
			// Handles changes of the root cell
			if (evt.property == this.rootKey && evt.newValue != null)
			{
				// Clears the lookup table to force complete cell hierarchy from collab model
				this.model.cells = null;
				this.executeChange(new mxRootChange(this.model, this.getCell(this.rootKey)));
			}
			else if (evt.property != this.rootKey && evt.newValue == null)
			{
				var cell = this.model.getCell(evt.property); 
				
				if (cell != null)
				{
					this.log('Cell removed: cell=' + cell.id);
					this.executeChange(new mxChildChange(this.model, null, cell));
					
				}
			}
		}
	}));
};

/**
 * Adds the listener for changes on the graph model and maps them to the collab
 * model as a single transaction.
 */
Sharing.prototype.installGraphModelListener = function()
{
	if (this.startEditListener == null)
	{
		this.startEditListener = mxUtils.bind(this, function()
		{
			this.log('---------');
			this.log('startEdit');
			this.log('---------');
			this.rt.beginCompoundOperation();
		});
	}
	
	this.model.addListener(mxEvent.START_EDIT, this.startEditListener);
	
	if (this.executedListener == null)
	{
		this.executedListener = mxUtils.bind(this, function(sender, evt)
		{
			try
			{
				this.log('executed', this.dump(evt.getProperty('change')));
				this.processChange(evt.getProperty('change'));
			}
			catch (e)
			{
				this.warn('*** Error: ' + e);
			}
		})
	}
	
	this.model.addListener(mxEvent.EXECUTED, this.executedListener);
	
	if (this.endEditListener == null)
	{
		this.endEditListener = mxUtils.bind(this, function()
		{
			// Updates timestamp
			this.rt.endCompoundOperation();
			this.log('-------');
			this.log('endEdit');
			this.log('-------');

		});
	}
	
	this.model.addListener(mxEvent.END_EDIT, this.endEditListener);
};


/**
 * Adds a listener to the graph selection model and writes changes
 * in the RT selection map
 */
Sharing.prototype.installSelectionModelListener = function()
{
	this.graph.getSelectionModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function(sender, evt)
	{
		var graph = this.graph;
		var selected = !graph.isSelectionEmpty();
		var vertexSelected = false;
		var edgeSelected = false;

		var cells = graph.getSelectionCells();
		
		if (cells != null && this.userId != null)
		{
			var selectedCellIds = '';
			
	    	for (var i = 0; i < cells.length; i++)
	    	{
	    		var cell = cells[i];
	    		
	    		if (i > 0)
	    		{
	    			selectedCellIds += ",";
	    		}
	    		
	    		selectedCellIds += cell.id;
	    	}
	    	
	    	this.selectionMap.set(this.userId, selectedCellIds);
		}
	}));
};

/**
 * Adds a listener for changes to the RT selection map to highlight
 * remote selection
 */
Sharing.prototype.installRemoteSelectionListener = function()
{
	this.selectionMap.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, mxUtils.bind(this, function(evt)
	{
		if (!this.isLocalEvent(evt))
		{
			if (evt.property != this.rootKey && evt.newValue != null)
			{
				var remoteUserId = evt.userId;
				var cellIds = evt.newValue.split(',');
				
				for (var i = 0; i < cellIds.length; i++)
				{
					var cell = this.model.getCell(cellIds[i]);
					
					if (cell != null)
					{
						this.highlight(cell, remoteUserId, true);
					}
				}
			}
		}
	}));
};

/**
 * Connects the collaborator event listeners to the draw function.
 */
Sharing.prototype.installCollaboratorListener = function()
{
	this.doc.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_JOINED, this.updateCollaborators);
	this.doc.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_LEFT, this.updateCollaborators);
};

/**
 * Draw function for the collaborator list.
 */
Sharing.prototype.updateCollaborators = function()
{
	// Creating the Collaborators container in the Dom if it's not already there.
	if (!document.getElementById("collaborators") && document.getElementsByClassName)
	{
		var toolbarElement = document.getElementsByClassName("geToolbar")[0];
		var collaboratorsElement = document.createElement('div');
		collaboratorsElement.id = "collaborators";
		collaboratorsElement.style.position = "absolute";
		collaboratorsElement.style.right = "15px";
		toolbarElement.appendChild(collaboratorsElement);
	}

	var collaboratorsElement = document.getElementById("collaborators");

	if (collaboratorsElement)
	{
		var sharing = this;
		
		if (sharing.doc == null)
		{
			sharing = this.rtclient.editorUi.sharing;
		}

		sharing.collaboratorsList = sharing.doc.getCollaborators();
		
    	collaboratorsElement.innerHTML = ""; // Clear the content of the collab container.
    	
		if (sharing.collaboratorsList.length > 1)
		{
			var spanContainer = document.createElement('span');
		    var message = document.createTextNode((sharing.collaboratorsList.length - 1) + " collaborator" + (sharing.collaboratorsList.length > 2 ? "s:" : ":"));
			spanContainer.appendChild(message);
			spanContainer.style.verticalAlign = "top";
			spanContainer.style.lineHeight = "30px";
			collaboratorsElement.appendChild(spanContainer);

			for (var i = 0; i < sharing.collaboratorsList.length; i = i + 1)
			{
				var collaborator = sharing.collaboratorsList[i];
				
				if (!collaborator.isMe)
				{
					var img = document.createElement('img');
					img.src = collaborator.photoUrl;
					img.alt = collaborator.displayName;
					img.title = collaborator.displayName;
					img.style.backgroundColor = collaborator.color;
					img.style.marginLeft = "5px";
					img.style.height = "25px";
					img.style.width = "25px";
					img.style.paddingBottom = "5px";
					collaboratorsElement.appendChild(img);
				}
				else
				{
					this.userId = collaborator.userId;
				}
			}
		}
		else if (sharing.collaboratorsList.length == 1)
		{
			var collaborator = sharing.collaboratorsList[0];
			
			if (collaborator.isMe)
			{
				this.userId = collaborator.userId;
			}
		}
	}
};

/**
 * Creates and returns a prefix for cell IDs.
 */
Sharing.prototype.createPrefix = function()
{
	var collabs = this.doc.getCollaborators();
	
	for (var i = 0; i < collabs.length; i++)
	{
		if (collabs[i]['isMe'])
		{
			return collabs[i]['sessionId'];
		}
	}
	
	return '';
};

/**
 * Returns a string representation of the given ops.
 */
Sharing.prototype.processChange = function(change)
{
	if (change instanceof mxRootChange)
	{
		this.initializeDocument();
	}
	else if (change instanceof mxChildChange)
	{
		// Inserts child into collab model only if parent is in collab model
		if (change.previous == null && change.parent != null && this.cellMap.has(change.parent.id))
		{
			this.addCell(change.child);
		}

		var childMap = this.cellMap.get(change.child.id);
		
		if (childMap != null)
		{
			// Setting parent to '' will remove from parent in other clients
			childMap.set('parent', (change.parent != null) ? change.parent.id : '');
		}
		
		//mxLog.debug(i, 'mxChildChange');
		// Removes index from old parent
		// ==> Move remove to listener to replace parent entry?
		if (change.previous != null)
		{
			var map = this.cellMap.get(change.previous.id);
			
			if (map != null)
			{
				var children = map.get('children');
				var index = change.previousIndex;
				var count = children.asArray().length;
				
				// Index may not match collab model
				if (index >= count || children.get(index) != change.child.id)
				{
					this.warn('*** Fixed possible inconsistency for child removal: parent=' + change.previous.id + ', child=' + change.child.id + ', previousIndex=' + change.previousIndex,
							', children=' + this.dump(children) + ', realIndex=' + index);
					index = children.indexOf(change.child.id);
				}
				
				if (index >= 0 && index < count)
				{
					this.log('Removing child: parent=' + change.previous.id + ', child=' + change.child.id + ', previousIndex=' + change.previousIndex,
							', children=' + this.dump(children) + ', realIndex=' + index);
					children.remove(index);
				}
			}
		}

		// Adds index to new parent
		// Change might reference a parent which hasn't been created in the collab
		if (change.parent != null)
		{
			var map = this.cellMap.get(change.parent.id);
			
			if (map != null)
			{
				var children = map.get('children');
				var count = children.asArray().length;
				
				if (change.index < count - 1 && children.get(change.index) == change.child.id)
				{
					this.warn('*** Ignored inconsistent insert: parent=' + change.parent.id + ', child=' + change.child.id + ', index=' + change.index,
						', children=' + this.dump(children));
				}
				else
				{
					this.log('Inserting child: parent=' + change.parent.id + ', child=' + change.child.id + ', index=' + change.index,
							', children=' + this.dump(children) + ', realIndex=' + Math.min(count, change.index));
					// Fixes possible index out of bounds for move in same parent
					children.insert(Math.min(count, change.index), change.child.id);
				}
			}
		}
		else if (change.parent == null)
		{
			// Removes recursively
			this.removeCell(change.child);
		}
	}
	// Geometry changes can occur before cell additional in the event order, ID are only
	// allocated on cell added. This happens on DnD and new group creation.
	else if (change.cell.id != null)
	{
		var map = this.cellMap.get(change.cell.id);
		
		if (map != null)
		{
			//mxLog.debug(i, mxUtils.getFunctionName(change.constructor));
			if (change instanceof mxTerminalChange)
			{
				var term = change.terminal; //this.model.getTerminal(change.cell, change.source);
				var key = (change.source) ? 'source' : 'target';
				var id = (term != null) ? term.id : '';
				map.set(key, id);
			}
			else if (change instanceof mxGeometryChange)
			{
				var xml = mxUtils.getXml(this.codec.encode(change.geometry));
				map.set('geometry', xml);
			}
			else if (change instanceof mxStyleChange)
			{
				map.set('style', change.style);
			}
			else if (change instanceof mxValueChange)
			{
				map.set('value', change.value);
			}
			else if (change instanceof mxCollapseChange)
			{
				map.set('collapsed', (change.collapsed) ? '1' : '0');
			}
			else if (change instanceof mxVisibleChange)
			{
				map.set('visible', (change.visible) ? '1' : '0');
			}
		}
	}
};

/**
 * Removes the given cell from the document recursively.
 */
Sharing.prototype.removeCell = function(cell)
{
	var childCount = this.model.getChildCount(cell);
	
	for (var i = 0; i < childCount; i++)
	{
		this.removeCell(this.model.getChildAt(cell, i));
	}

	// Has no effect if cell already removed
	// Using delete as a function name causes problems with default closure
	var map = this.cellMap.delete(cell.id);
	
	if (map != null)
	{
		this.log('Removed cell: cell=' + cell.id);
	}
};

/**
 * Adds cells into the RT model recursively.
 */
Sharing.prototype.addCell = function(cell)
{
	// The change events for these can be ignored as the information
	// is collected in getCell when the cell is initially created.
	var childCount = this.model.getChildCount(cell);
	var children = this.rt.createList();

	for (var i = 0; i < childCount; i++)
	{
		var child = this.model.getChildAt(cell, i);
		
		// Only inserts child ID if child is not yet in collab
		if (!this.cellMap.has(child.id))
		{
			children.push(child.id);
		}
		
		this.addCell(child);
	}

	// This will have no effect if cell is already in document
	if (!this.cellMap.has(cell.id))
	{
		var map = this.writeCell(cell, this.rt.createMap());
		map.set('children', children);
		this.cellMap.set(cell.id, map);
		this.installListeners(cell, map);
		
		this.log('addCell: cell=' + cell.id + ', children=', this.dump(children));
	}
};

/**
 * Creates cell instance from information in the RT model.
 */
Sharing.prototype.getCell = function(id)
{
	var cell = null;
	var map = this.cellMap.get(id);
	
	if (map != null)
	{
		cell = this.readCell(map, new mxCell());
		var children = map.get('children');
		cell.id = id;
	
		this.log('getCell: cell=' + id + ', children=' + this.dump(children));
	
		if (children != null)
		{
			// FIXME: Use getSize instead (missing in public API)
			var count = children.asArray().length;
			
			for (var i = 0; i < count; i++)
			{
				var childId = children.get(i);
				var child = this.model.getCell(childId);
				
				// Child is not yet in model so create it from shared model
				if (child == null)
				{
					child = this.getCell(childId);
					
					if (child != null)
					{
						cell.insert(child);
					}
				}
			}
		}
		
		this.installListeners(cell);
	}
	
	return cell;
};

/**
 * Restores connection between edges and terminals.
 */
Sharing.prototype.restoreCell = function(cell)
{
	if (cell != null)
	{
		//this.log('Restore cell: cell=' + cell.id);
		var map = this.cellMap.get(cell.id);
		
		if (map != null)
		{
			var id = map.get('source');
			
			if (id != null && id != '')
			{
				var terminal = this.model.getCell(id);
				
				// Should never be null
				if (terminal != null)
				{
					terminal.insertEdge(cell, true);
				}
				else
				{
					this.warn('*** Terminal not found: edge=' + cell.id + ' source=' + id);
				}
			}
			
			id = map.get('target');
			
			if (id != null && id != '')
			{
				var terminal = this.model.getCell(id);
				
				// Should never be null
				if (terminal != null)
				{
					terminal.insertEdge(cell, false);
				}
				else
				{
					this.warn('*** Terminal not found: edge=' + cell.id + ' target=' + id);
				}
			}
		}
		
		var childCount = this.model.getChildCount(cell);
		
		if (childCount > 0)
		{
			for (var i = 0; i < childCount; i++)
			{
				this.restoreCell(this.model.getChildAt(cell, i));
			}
		}
	}
};

Sharing.prototype.installListeners = function(cell)
{
	var map = this.cellMap.get(cell.id);
	var children = map.get('children');

	children.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED, mxUtils.bind(this, function(evt)
	{
		if (!this.isLocalEvent(evt))
		{
			var i = evt.index;
			// FIXME: Evt.values may be null
			var childId = (evt.values != null && evt.values.length > 0) ? evt.values[0] : children.get(i);
			var child = this.model.getCell(childId);
			
			// Creates new cell from collab model
			if (child == null)
			{
				//this.log('add cell: ' + childId);
				child = this.getCell(childId);
			}
			
			this.log('Values added: parent=' + cell.id + ', child=' + child.id + ', index=' + i,
					'children in model=' + this.model.getChildCount(cell));
			
			if (child != null)
			{
				// Removes orphaned child entries from old parent
				var parent = this.model.getParent(child);
				
				if (parent != null && parent != cell && parent.id != this.cellMap.get(childId).get('parent'))
				{
					var map2 = this.cellMap.get(parent.id);
					
					if (map2 != null )
					{
						var children2 = map2.get('children');
						var idx = children2.indexOf(childId);
						
						if (idx >= 0)
						{
							this.log('Removing child ' + childId + ' from previous parent ' + parent.id, this.dump(children2));
							children2.remove(idx);
						}
					}
				}
				
				// Ignore this if the local parent is already correct
				if (this.cellMap.get(childId).get('parent') == cell.id)
				{
					this.executeChange(new mxChildChange(this.model, cell, child, i));
					
				    setTimeout(mxUtils.bind(this, function()
				    {
				    	this.highlight(child, evt.userId);
				    }), 100);
				}
				else
				{
					this.log('Ignored child change: parent=' + this.model.getParent(child).id +
							' parent in map=' + this.cellMap.get(childId).get('parent'));
				}
			}
		}
	}));
	
	/*children.addEventListener(gapi.drive.realtime.EventType.VALUES_SET, mxUtils.bind(this, function(evt)
	{
		if (!this.isLocalEvent(evt))
		{
			this.log('********** Values set: parent=' + evt.index);
		}
	}));*/

	// Listen to property changes
	map.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, mxUtils.bind(this, function(evt)
	{
		if (!this.isLocalEvent(evt))
		{
			var key = evt.property;
			var value = evt.newValue;
			var userId = evt.userId;
	
			if (value != null)
			{
				//this.log('Value changed: cell=' + cell.id + ', key=' + key + ', value=' + value);
				
	    		if (key == 'vertex')
	    		{
	    			cell.vertex = true;
	    		}
	    		else if (key == 'edge')
	    		{
	    			cell.edge = true;
	    		}
	    		else if (key == 'connectable')
	    		{
	    			cell.connectable = (value == '1');
	    		}
	    		else if (key == 'source' || key == 'target')
	    		{
	    			var terminal = (value.length > 0) ? this.model.getCell(value) : null;
	    			this.executeChange(new mxTerminalChange(this.model, cell, terminal, (key == 'source')));
	    		}
	    		else if (key == 'value')
	    		{
	    			this.executeChange(new mxValueChange(this.model, cell, value));
	    			this.highlight(cell, userId);
	    		}
	    		else if (key == 'style')
	    		{
	    			this.executeChange(new mxStyleChange(this.model, cell, value));
	    			this.highlight(cell, userId);
	    		}
	    		else if (key == 'geometry')
	    		{
	    			var geometry = this.codec.decode(mxUtils.parseXml(value).documentElement);
	    			this.executeChange(new mxGeometryChange(this.model, cell, geometry));
	    			this.highlight(cell, userId);
	    		}
	    		else if (key == 'collapsed')
	    		{
	    			this.executeChange(new mxCollapseChange(this.model, cell, value == '1'));
	    			this.highlight(cell, userId);
	    		}
	    		else if (key == 'visible')
	    		{
	    			this.executeChange(new mxVisibleChange(this.model, cell, value == '1'));
	    			this.highlight(cell, userId);
	    		}
			}
		}
	}));
};

Sharing.prototype.highlight = function(cell, userId, selection)
{
	selection = (selection != null) ? selection : false;
	var state = this.graph.view.getState(cell);
	
	if (state != null)
	{
		var color = 'red'; // remote change highlighting color

		for (var i = 0; i < this.collaboratorsList.length; i = i + 1)
		{
			var collaborator = this.collaboratorsList[i];
			
			if (!collaborator.isMe && collaborator.userId == userId)
			{
				color = collaborator.color;
			}      
		}

		var hl = new mxCellHighlight(this.graph, color, 3, selection);

	    hl.highlight(state);
	    
		hl.shape.node.style.opacity = 1.0;
		hl.shape.node.style.WebkitTransition = 'all 1200ms ease-in-out';
		hl.shape.node.style.MozTransition = 'all 1200ms ease-in-out';
		hl.shape.node.style.OTransition = 'all 1200ms ease-in-out';
		hl.shape.node.style.transition = 'all 1200ms ease-in-out';
		
		var finalOpacity = selection ? 1 : 0;
		    
	    window.setTimeout(function()
	    {
		    hl.shape.node.style.opacity = finalOpacity;

		    window.setTimeout(function()
		    {
		    	hl.destroy();
		    }, 1200);
	    }, 1200);
	}
};

Sharing.prototype.executeChange = function(change, immediate)
{
	this.log('Execute change: change=' + this.dump(change));
	
	// Immediate clears existing changes
	if (immediate || this.changes == null)
	{
		this.changes = [change];
		this.scheduled = false;
	}
	else
	{
		this.changes.push(change);
	}

	change.execute();

	if (!this.scheduled)
	{
		this.scheduled = true;
		
		var exec = mxUtils.bind(this, function()
		{
			if (this.changes != null)
			{
	    		var edit = new mxUndoableEdit(this.model, true);
	    		edit.changes = this.changes;
	    		this.changes = null;
	    		this.scheduled = false;
	    		
	    		// Restores graph structure after all cells have been
		    	// inserted. This is required for all IDs to resolve.
	    		for (var i = 0; i < edit.changes.length; i++)
	    		{
	    			var change = edit.changes[i];
	    			
		    		if (change instanceof mxRootChange)
		    		{
		    			this.restoreCell(this.model.root);
		    			break;
		    		}
		    		else if (change instanceof mxChildChange)
		    		{
		    			// Cell was inserted
		    			if (change.previous == null && change.parent != null)
		    			{
		    				this.restoreCell(change.child);
		    			}
		    		}
	    		}

	    		edit.notify = function()
	    		{
	    			edit.source.fireEvent(new mxEventObject(mxEvent.CHANGE,
	    				'edit', edit, 'changes', edit.changes, 'rtChange', true));
	    			edit.source.fireEvent(new mxEventObject(mxEvent.NOTIFY,
	    				'edit', edit, 'changes', edit.changes, 'rtChange', true));
	    		};
	    		
	    		this.log('Execute change: changes=' + edit.changes.length);
	    		
	    		this.model.fireEvent(new mxEventObject(mxEvent.CHANGE,
					'edit', edit, 'changes', edit.changes, 'rtChange', true));
	    		this.model.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', edit));
			}
		});
		
		if (immediate)
		{
			exec();
		}
		else
		{
			window.setTimeout(exec, 0);
		}
	}
};

/**
 * Writes all persistent properties from the cell to the object.
 */
Sharing.prototype.writeCell = function(cell, map)
{
	// Redundant information to detect inconsistencies
	if (cell.parent != null)
	{
		map.set('parent', cell.parent.id);
	}
	
	if (cell.vertex)
	{
		map.set('vertex', 1);
	}
	else if (cell.edge)
	{
		map.set('edge', 1);
	}
	
	if (cell.value != null)
	{
		map.set('value', cell.value);
	}
	
	if (cell.style != null)
	{
		map.set('style', cell.style);
	}
	
	if (cell.geometry != null)
	{
		map.set('geometry', mxUtils.getXml(this.codec.encode(cell.geometry)));
	}

	// True (default) is ignored
	if (!cell.visible)
	{
		map.set('visible', (cell.visible) ? '1' : '0');
	}
	
	// False (default) is ignored
	if (cell.collapsed)
	{
		map.set('collapsed', (cell.collapsed) ? '1' : '0');
	}

	// True (default) is ignored
	if (!cell.connectable)
	{
		map.set('connectable', (cell.connectable) ? '1' : '0');
	}

	if (cell.source != null)
	{
		map.set('source', cell.source.id);
	}
	
	if (cell.target != null)
	{
		map.set('target', cell.target.id);
	}
	
	return map;
};

/**
 * Reads all persistent properties from the object into the cell.
 */
Sharing.prototype.readCell = function(map, cell)
{
	if (map.has('vertex'))
	{
		cell.vertex = true;
	}
	else if (map.has('edge'))
	{
		cell.edge = true;
	}

	if (map.has('value'))
	{
		cell.value = map.get('value');
	}
	
	if (map.has('style'))
	{
		cell.style = map.get('style');
	}
	
	if (map.has('geometry'))
	{
		cell.geometry = this.codec.decode(mxUtils.parseXml(map.get('geometry')).documentElement);
	}
	
	if (map.has('visible'))
	{
		cell.visible = map.get('visible') == '1';
	}
	
	if (map.has('collapsed'))
	{
		cell.collapsed = map.get('collapsed') == '1';
	}
	
	if (map.has('connectable'))
	{
		cell.connectable = map.get('connectable') == '1';
	}

	return cell;
};

/**
 * Writes out a string representing the current state of the document.
 */
Sharing.prototype.dumpRoot = function()
{
	return this.dump(this.rt.getRoot());
};

/**
 * Creates a dump of the given map.
 */
Sharing.prototype.dump = function(obj)
{
	var result = '';
	
	if (obj != null)
	{
		if (obj.constructor == mxCell)
		{
			return obj.id;
		}
		else if (obj.constructor == mxRootChange)
		{
			result += 'mxRootChange[root=' + this.dump(obj.root) + ']';
		}
		else if (obj.constructor == mxChildChange)
		{
			result += 'mxChildChange[parent=' + this.dump(obj.parent) +
				', child=' + this.dump(obj.child.id) +
				', index=' + obj.index + ']';
		}
		else if (obj.constructor == mxTerminalChange)
		{
			result += 'mxTerminalChange[cell=' + this.dump(obj.cell) +
				', terminal=' + this.dump(obj.terminal) +
				', source=' + obj.source + ']';
		}
		else if (obj.constructor == mxValueChange)
		{
			result += 'mxValueChange[cell=' + this.dump(obj.cell) + ', value=' + obj.value + ']';
		}
		else if (obj.constructor == mxGeometryChange)
		{
			result += 'mxGeometryChange[cell=' + this.dump(obj.cell) +
				', geometry=' + mxUtils.getXml(this.codec.encode(obj.cell.geometry)) + ']';
		}
		else if (obj.constructor == mxStyleChange)
		{
			result += 'mxStyleChange[cell=' + this.dump(obj.cell) + ', style=' + obj.style + ']';
		}
		else if (obj.constructor == mxVisibleChange)
		{
			result += 'mxVisibleChange[cell=' + this.dump(obj.cell) + ', visible=' + obj.visible + ']';
		}
		else if (obj.constructor == mxCollapseChange)
		{
			result += 'mxCollapseChange[cell=' + this.dump(obj.cell) + ', collapsed=' + obj.collapsed + ']';
		}
		else if (obj.keys != null)
		{
			var keys = obj.keys();
			result += '{\n';
			
			for (var i = 0; i < keys.length; i++)
			{
				result += keys[i] + '=' + this.dump(obj.get(keys[i])) + ';\n';
			}
			
			result += '}';
		}
		else if (obj.asArray != null)
		{
			var arr = obj.asArray();
			result += '[';
			
			for (var i = 0; i < arr.length; i++)
			{
				result += arr[i] + ';';
			}
			
			result += ']';
		}
		else
		{
			result = obj;
		}
	}
	else
	{
		result = 'null';
	}
	
	return result;
};

/**
 * Writes the given text to the log if <logging> is enabled.
 */
Sharing.prototype.log = function()
{
	if (this.logging)
	{
		mxLog.debug.apply(mxLog, arguments);
	}
};

/**
 * Writes the given text to the log if <logging> is enabled.
 */
Sharing.prototype.warn = function()
{
	if (this.warnings)
	{
		mxLog.debug.apply(mxLog, arguments);
	}
};

/**
 * Destroys the instance and removes all listeners.
 */
Sharing.prototype.destroy = function()
{
	this.doc.close();
	
	if (this.startEditListener != null)
	{
		this.model.removeListener(this.startEditListener);
		this.startEditListener = null;
	}
	
	if (this.executedListener != null)
	{
		this.model.removeListener(this.executedListener);
		this.executedListener = null;
	}
	
	if (this.endEditListener != null)
	{
		this.model.removeListener(this.endEditListener);
		this.endEditListener = null;
	}
	
	this.model = null;
	this.doc = null;
	this.rt = null;
	this.codec = null;
	this.userId = null;
	
	//remove collaboratros list on disconnect from RT
	var collabsElt = document.getElementById('collaborators');
	collabsElt.parentNode.removeChild(collabsElt);
	
	window.rtclient.editorUi.animate = true;
	
};
