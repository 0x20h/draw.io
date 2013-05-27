(function()
{
	/**
	 * Overrides gear image URL.
	 */
	Sidebar.prototype.gearImage = GRAPH_IMAGE_PATH + '/clipart/Gear_128x128.png';

	/**
	 * Specifies the names of items for the signs category.
	 */
	Sidebar.prototype.signs =  ['Animals', 'Food', 'Healthcare', 'Nature', 'People', 'Safety', 'Science', 'Sports', 'Tech', 'Transportation', 'Travel'];

	/**
	 * Specifies the names of items for the rack category.
	 */
	Sidebar.prototype.rack = ['General', 'APC', 'Cisco', 'Dell', 'HP', 'IBM', 'Oracle'];

	/**
	 * Specifies the names of items for the mockups category.
	 */
	Sidebar.prototype.mockups = ['Buttons', 'Containers', 'Forms', 'Graphics', 'Markup', 'Misc', 'Navigation', 'Text'];

	/**
	 * Specifies the names of items for the ee category.
	 */
	Sidebar.prototype.ee = ['Abstract', 'Capacitors', 'Diodes', 'Electro-mechanical', 'IEC logic gates', 'IEC417', 'Inductors',
	           	         'Instruments', 'Logic gates', 'Miscellaneous', 'MOSFETs1', 'MOSFETs2', 'Op amps', 'Opto-electronics',
	        	         'PLC ladder', 'Power semiconductors', 'Radio', 'Resistors', 'Signal sources', 'Thermionic devices',
	        	         'Transistors', 'Waveforms'];

	/**
	 * Specifies the names of items for the cisco category.
	 */
	Sidebar.prototype.cisco = ['Buildings', 'Computers and Peripherals', 'Controllers and Modules', 'Directors', 'Hubs and Gateways', 'Misc', 
	               	         'Modems and Phones', 'People', 'Routers', 'Security', 'Servers', 'Storage', 'Switches', 'Wireless'];

	/**
	 * Specifies the names of items for the pids category.
	 */
	Sidebar.prototype.pids = ['Compressors', 'Heat Exchangers', 'Instruments', 'Pumps', 'Valves', 'Vessels'];
	
	/**
	 * Specifies special libraries that are loaded via dynamic JS.
	 */
	mxStencilRegistry.libraries['bpmn'] = [SHAPES_PATH + '/bpmn/mxBpmnShape2.js', STENCIL_PATH + '/bpmn.xml'];
	mxStencilRegistry.libraries['er'] = [SHAPES_PATH + '/er/mxER.js'];
	mxStencilRegistry.libraries['ios'] = [SHAPES_PATH + '/mockup/mxMockupiOS.js'];
//	mxStencilRegistry.libraries['rackGeneral'] = [SHAPES_PATH + '/rack/mxRack.js', STENCIL_PATH + '/rack/general.xml'];
	mxStencilRegistry.libraries['lean_mapping'] = [SHAPES_PATH + '/mxLeanMap.js'];
	mxStencilRegistry.libraries['mockup/buttons'] = [SHAPES_PATH + '/mockup/mxMockupButtons.js'];
	mxStencilRegistry.libraries['mockup/containers'] = [SHAPES_PATH + '/mockup/mxMockupContainers.js'];
	mxStencilRegistry.libraries['mockup/forms'] = [SHAPES_PATH + '/mockup/mxMockupForms.js'];
	mxStencilRegistry.libraries['mockup/graphics'] = [SHAPES_PATH + '/mockup/mxMockupGraphics.js', STENCIL_PATH + '/mockup/misc.xml'];
	mxStencilRegistry.libraries['mockup/markup'] = [SHAPES_PATH + '/mockup/mxMockupMarkup.js'];
	mxStencilRegistry.libraries['mockup/misc'] = [SHAPES_PATH + '/mockup/mxMockupMisc.js', STENCIL_PATH + '/mockup/misc.xml'];
	mxStencilRegistry.libraries['mockup/navigation'] = [SHAPES_PATH + '/mockup/mxMockupNavigation.js', STENCIL_PATH + '/mockup/misc.xml'];
	mxStencilRegistry.libraries['mockup/text'] = [SHAPES_PATH + '/mockup/mxMockupText.js'];
	
	/**
	 * Toggle palette.
	 */
	Sidebar.prototype.togglePalettes = function(prefix, ids)
	{
		this.showPalettes(prefix, ids);
	};

	/**
	 * Toggle palette.
	 */
	Sidebar.prototype.togglePalette = function(id)
	{
		this.showPalette(id);
	};
	
	/**
	 * Shows or hides palettes.
	 */
	Sidebar.prototype.showPalettes = function(prefix, ids, visible)
	{
		for (var i = 0; i < ids.length; i++)
		{
			this.showPalette(prefix + ids[i], visible);
		}
	};

	
	/**
	 * Shows or hides a palette.
	 */
	Sidebar.prototype.showPalette = function(id, visible)
	{
		var elts = this.palettes[id];
		
		if (elts != null)
		{
			var vis = (visible != null) ? ((visible) ? 'block' : 'none') : (elts[0].style.display == 'none') ? 'block' : 'none';
			
			for (var i = 0; i < elts.length; i++)
			{
				elts[i].style.display = vis;
			}
		}
	};

	// Replaces the sidebar
	Sidebar.prototype.init = function()
	{
		var imgDir = GRAPH_IMAGE_PATH;
		var dir = STENCIL_PATH;
		var signs = this.signs;
		var rack = this.rack;
		var mockups = this.mockups;
		var ee = this.ee;
		var pids = this.pids;
		var cisco = this.cisco;

		this.addGeneralPalette(true);
		this.addIconfinder();
		this.addUmlPalette(false);
		this.addErPalette();
		this.addLeanMappingPalette();
		this.addIosPalette();
		this.addStencilPalette('flowchart', 'Flowchart', dir + '/flowchart.xml',
			';fillColor=#ffffff;strokeColor=#000000;strokeWidth=2');
		this.addMockups();
		this.addBpmnPalette(dir, false);
		this.addStencilPalette('basic', mxResources.get('basic'), dir + '/basic.xml',
			';fillColor=#ffffff;strokeColor=#000000;strokeWidth=2');
		this.addStencilPalette('arrows', mxResources.get('arrows'), dir + '/arrows.xml',
			';fillColor=#ffffff;strokeColor=#000000;strokeWidth=2');
		this.addImagePalette('computer', 'Clipart / Computer', imgDir
				+ '/lib/clip_art/computers/', '_128x128.png', [ 'Antivirus',
				'Data_Filtering', 'Database', 'Database_Add', 'Database_Minus',
				'Database_Move_Stack', 'Database_Remove', 'Fujitsu_Tablet',
				'Harddrive', 'IBM_Tablet', 'iMac', 'iPad', 'Laptop', 'MacBook',
				'Mainframe', 'Monitor', 'Monitor_Tower',
				'Monitor_Tower_Behind', 'Netbook', 'Network', 'Network_2',
				'Printer', 'Printer_Commercial', 'Secure_System', 'Server',
				'Server_Rack', 'Server_Rack_Empty', 'Server_Rack_Partial',
				'Server_Tower', 'Software', 'Stylus', 'Touch', 'USB_Hub',
				'Virtual_Application', 'Virtual_Machine', 'Virus',
				'Workstation' ], [ 'Antivirus', 'Data Filtering', 'Database',
	            'Database Add', 'Database Minus', 'Database Move Stack',
	            'Database Remove', 'Fujitsu Tablet', 'Harddrive', 'IBMTablet',
	            'iMac', 'iPad', 'Laptop', 'MacBook', 'Mainframe', 'Monitor',
	            'Monitor Tower', 'Monitor Tower Behind', 'Netbook', 'Network',
	            'Network 2', 'Printer', 'Printer Commercial', 'Secure System',
	            'Server', 'Server Rack', 'Server Rack Empty', 'Server Rack Partial',
	            'Server Tower', 'Software', 'Stylus', 'Touch', 'USB Hub',
	            'Virtual Application', 'Virtual Machine', 'Virus', 'Workstation' ]);
		this.addImagePalette('finance', 'Clipart / Finance', imgDir
				+ '/lib/clip_art/finance/', '_128x128.png', [ 'Arrow_Down',
				'Arrow_Up', 'Coins', 'Credit_Card', 'Dollar', 'Graph',
				'Pie_Chart', 'Piggy_Bank', 'Safe', 'Shopping_Cart',
				'Stock_Down', 'Stock_Up' ], [ 'Arrow_Down', 'Arrow Up',
	            'Coins', 'Credit Card', 'Dollar', 'Graph', 'Pie Chart',
	            'Piggy Bank', 'Safe', 'Shopping Basket', 'Stock Down', 'Stock Up' ]);
		this.addImagePalette('clipart', 'Clipart / Various', imgDir
				+ '/lib/clip_art/general/', '_128x128.png', [ 'Battery_0',
				'Battery_100', 'Battery_50', 'Battery_75', 'Battery_allstates',
				'Bluetooth', 'Earth_globe', 'Empty_Folder', 'Full_Folder',
				'Gear', 'Keys', 'Lock', 'Mouse_Pointer', 'Plug', 'Ships_Wheel',
				'Star', 'Tire' ], [ 'Battery 0%', 'Battery 100%', 'Battery 50%',
	            'Battery 75%', 'Battery', 'Bluetooth', 'Globe',
	            'Empty Folder', 'Full Folder', 'Gear', 'Keys', 'Lock', 'Mousepointer',
	            'Plug', 'Ships Wheel', 'Star', 'Tire' ] );
		this.addImagePalette('networking', 'Clipart / Networking', imgDir
				+ '/lib/clip_art/networking/', '_128x128.png', [ 'Bridge',
				'Certificate', 'Certificate_Off', 'Cloud', 'Cloud_Computer',
				'Cloud_Computer_Private', 'Cloud_Rack', 'Cloud_Rack_Private',
				'Cloud_Server', 'Cloud_Server_Private', 'Cloud_Storage',
				'Concentrator', 'Email', 'Firewall_02', 'Firewall',
				'Firewall-page1', 'Ip_Camera', 'Modem',
				'power_distribution_unit', 'Print_Server',
				'Print_Server_Wireless', 'Repeater', 'Router', 'Router_Icon',
				'Switch', 'UPS', 'Wireless_Router', 'Wireless_Router_N' ],
				[ 'Bridge', 'Certificate', 'Certificate Off', 'Cloud', 'Cloud Computer',
				'Cloud Computer Private', 'Cloud Rack', 'Cloud Rack Private',
				'Cloud Server', 'Cloud Server Private', 'Cloud Storage',
				'Concentrator', 'Email', 'Firewall 1', 'Firewall 2',
				'Firewall', 'Camera', 'Modem',
				'Power Distribution Unit', 'Print Server',
				'Print Server Wireless', 'Repeater', 'Router', 'Router Icon',
				'Switch', 'UPS', 'Wireless Router', 'Wireless Router N' ]);
		this.addImagePalette('people', 'Clipart / People', imgDir
				+ '/lib/clip_art/people/', '_128x128.png', [ 'Suit_Man',
				'Suit_Man_Black', 'Suit_Man_Blue', 'Suit_Man_Green',
				'Suit_Man_Green_Black', 'Suit_Woman', 'Suit_Woman_Black',
				'Suit_Woman_Blue', 'Suit_Woman_Green',
				'Suit_Woman_Green_Black', 'Construction_Worker_Man',
				'Construction_Worker_Man_Black', 'Construction_Worker_Woman',
				'Construction_Worker_Woman_Black', 'Doctor_Man',
				'Doctor_Man_Black', 'Doctor_Woman', 'Doctor_Woman_Black',
				'Farmer_Man', 'Farmer_Man_Black', 'Farmer_Woman',
				'Farmer_Woman_Black', 'Nurse_Man', 'Nurse_Man_Black',
				'Nurse_Man_Green', 'Nurse_Man_Red', 'Nurse_Woman',
				'Nurse_Woman_Black', 'Nurse_Woman_Green', 'Nurse_Woman_Red',
				'Military_Officer', 'Military_Officer_Black',
				'Military_Officer_Woman', 'Military_Officer_Woman_Black',
				'Pilot_Man', 'Pilot_Man_Black', 'Pilot_Woman',
				'Pilot_Woman_Black', 'Scientist_Man', 'Scientist_Man_Black',
				'Scientist_Woman', 'Scientist_Woman_Black', 'Security_Man',
				'Security_Man_Black', 'Security_Woman', 'Security_Woman_Black',
				'Soldier', 'Soldier_Black', 'Tech_Man', 'Tech_Man_Black',
				'Telesales_Man', 'Telesales_Man_Black', 'Telesales_Woman',
				'Telesales_Woman_Black', 'Waiter', 'Waiter_Black',
				'Waiter_Woman', 'Waiter_Woman_Black', 'Worker_Black',
				'Worker_Man', 'Worker_Woman', 'Worker_Woman_Black' ]);
		this.addImagePalette('telco', 'Clipart / Telecommunication', imgDir
				+ '/lib/clip_art/telecommunication/', '_128x128.png', [
				'BlackBerry', 'Cellphone', 'HTC_smartphone', 'iPhone',
				'Palm_Treo', 'Signal_tower_off', 'Signal_tower_on' ],
				[ 'BlackBerry', 'Cellphone', 'HTC smartphone', 'iPhone',
				  'Palm Treo', 'Signaltower off', 'Signaltower on' ]);

		for (var i = 0; i < signs.length; i++)
		{
			this.addStencilPalette('signs' + signs[i], 'Signs / ' + signs[i],
				dir + '/signs/' + signs[i].toLowerCase() + '.xml',
				';fillColor=#000000;strokeColor=none');
		}
		
		for (var i = 0; i < rack.length; i++)
		{
			if (rack[i].toLowerCase() === 'changethistogeneral')
			{
				this.addRackGeneralPalette();
			}
			else
			{
				this.addStencilPalette('rack' + rack[i], 'Rack / ' + rack[i],
					dir + '/rack/' + rack[i].toLowerCase() + '.xml',
					'');
			}
		}

		for (var i = 0; i < ee.length; i++)
		{
			this.addStencilPalette('electrical' + ee[i], 'Electrical / ' + ee[i],
				dir + '/electrical/' + ee[i].toLowerCase().replace(/ /g, '_') + '.xml',
				';fillColor=white;strokeColor=black');
		}

		// Adds AWS stencils
		this.addStencilPalette('awsCompute', 'AWS / Compute', dir + '/aws/compute.xml', ';fillColor=#FF9800;strokeColor=none');
		this.addStencilPalette('awsContentDelivery', 'AWS / Content Delivery', dir + '/aws/content_delivery.xml', ';fillColor=#1EA4DD;strokeColor=none');
		this.addStencilPalette('awsDatabase', 'AWS / Database', dir + '/aws/database.xml', ';fillColor=#6F2D6E;strokeColor=none');
		this.addStencilPalette('awsDeploymentManagement', 'AWS / Deployment Management', dir + '/aws/deployment_management.xml', ';fillColor=#296934;strokeColor=none');
		this.addStencilPalette('awsGroups', 'AWS / Groups', dir + '/aws/groups.xml');
		this.addStencilPalette('awsMessaging', 'AWS / Messaging', dir + '/aws/messaging.xml', ';fillColor=#B8B58A;strokeColor=none');
		this.addStencilPalette('awsMisc', 'AWS / Misc', dir + '/aws/misc.xml', ';fillColor=#F7981F;strokeColor=none');
		this.addStencilPalette('awsNetworking', 'AWS / Networking', dir + '/aws/networking.xml', ';fillColor=#262261;strokeColor=none');
		this.addStencilPalette('awsNonServiceSpecific', 'AWS / Non Service Specific', dir + '/aws/non_service_specific.xml', ';fillColor=#C5C7C9;strokeColor=none');
		this.addStencilPalette('awsOnDemandWorkforce', 'AWS / On Demand Workforce', dir + '/aws/on_demand_workforce.xml', ';fillColor=#C5C7C9;strokeColor=none');
		this.addStencilPalette('awsStorage', 'AWS / Storage', dir + '/aws/storage.xml', ';fillColor=#146EB4;strokeColor=none');

		for (var i = 0; i < pids.length; i++)
		{
			this.addStencilPalette('pid' + pids[i], 'P&ID / ' + pids[i],
				dir + '/pid/' + pids[i].toLowerCase().replace(' ', '_') + '.xml',
				';fillColor=#ffffff;strokeColor=#000000');
		}
		
//		this.addStencilPalette('leanMapping', 'Lean Mapping', dir + '/lean_mapping.xml',
//			';fillColor=#ffffff;strokeColor=#000000;strokeWidth=2');
			
		for (var i = 0; i < cisco.length; i++)
		{
			this.addStencilPalette('cisco' + cisco[i], 'Cisco / ' + cisco[i],
				dir + '/cisco/' + cisco[i].toLowerCase().replace(/ /g, '_') + '.xml',
				';fillColor=#036897;strokeColor=#ffffff;strokeWidth=2', null, null, 1.6);
		}
	};

	/**
	 * Adds a handler for inserting the cell with a single click.
	 */
	var sidebarItemClicked = Sidebar.prototype.itemClicked;
	
	Sidebar.prototype.itemClicked = function(cells, ds, evt)
	{
		var graph = this.editorUi.editor.graph;
		var handled = false;
		
		if (cells != null && graph.getSelectionCount() == 1 && graph.getModel().isVertex(cells[0]))
		{
			var target = graph.cloneCells(cells)[0];
			
			if (graph.getModel().isEdge(graph.getSelectionCell()) && graph.getModel().getTerminal(graph.getSelectionCell(), false) == null &&
				graph.getModel().isVertex(target))
			{
				graph.getModel().beginUpdate();
				try
				{
					var edgeState = graph.view.getState(graph.getSelectionCell());
					
					if (edgeState != null)
					{
						var tr = graph.view.translate;
						var s = graph.view.scale;
						var pt = edgeState.absolutePoints[edgeState.absolutePoints.length - 1];

						target.geometry.x = pt.x / s - tr.x - target.geometry.width / 2;
						target.geometry.y = pt.y / s - tr.y - target.geometry.height / 2;
					}
					
					graph.addCell(target);
					graph.getModel().setTerminal(graph.getSelectionCell(), target);
				}
				finally
				{
					graph.getModel().endUpdate();
				}
				
				graph.scrollCellToVisible(target);
				graph.setSelectionCell(target);
				handled = true;
			}
			else if (urlParams['nerd'] == '1' && graph.getModel().isVertex(graph.getSelectionCell()))
			{
				graph.getModel().beginUpdate();
				try
				{
					// LATER: Use size from target and position from selection cell?
					graph.getModel().setStyle(graph.getSelectionCell(), graph.getModel().getStyle(target));
					graph.getModel().setValue(graph.getSelectionCell(), graph.getModel().getValue(target));
				}
				finally
				{
					graph.getModel().endUpdate();
				}
				
				graph.scrollCellToVisible(graph.getSelectionCell());
				handled = true;
			}
		}
		
		if (!handled)
		{
			sidebarItemClicked.apply(this, arguments);
			
			if (urlParams['nerd'] == '1')
			{
				graph.clearSelection();
			}
		}
	};

	// Adds the iconfinder library
	Sidebar.prototype.addIconfinder = function()
	{
		// TODO: Fix delayed typing, occasional error in library creation in quirks mode
		var elt = this.createTitle(mxResources.get('images'));
		this.container.appendChild(elt);
		
		var div = document.createElement('div');
		div.className = 'geSidebar';
	    div.style.display = 'none';
		div.style.overflow = 'hidden';
		div.style.width = '100%';
		div.style.padding = '0px';
		
		var inner = document.createElement('div');
		inner.className = 'geTitle';
		inner.style.backgroundColor = 'transparent';
		inner.style.borderColor = 'transparent';
		inner.style.padding = '4px';
		inner.style.textOverflow = 'clip';
		inner.style.cursor = 'default';
		
		if (!mxClient.IS_VML)
		{
			inner.style.paddingRight = '20px';
		}

		var searchResource = mxResources.get('search');
		
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.value = searchResource;
		input.style.border = 'solid 1px #d5d5d5';
		input.style.width = '100%';
		input.style.backgroundImage = 'url(' + IMAGE_PATH + '/clear.gif)';
		input.style.backgroundRepeat = 'no-repeat';
		input.style.backgroundPosition = '100% 50%';
		input.style.paddingRight = '14px';
		inner.appendChild(input);

		var cross = document.createElement('div');
		cross.setAttribute('title', mxResources.get('reset'));
		cross.style.position = 'relative';
		cross.style.left = '-16px';
		cross.style.width = '12px';
		cross.style.height = '14px';
		cross.style.cursor = 'pointer';

		// Workaround for inline-block not supported in IE
		cross.style.display = (mxClient.IS_VML) ? 'inline' : 'inline-block';
		cross.style.top = ((mxClient.IS_VML) ? 0 : 3) + 'px';
		
		// Needed to block event transparency in IE
		cross.style.background = 'url(' + IMAGE_PATH + '/transparent.gif)';
		
		var find;

		mxEvent.addListener(cross, 'click', function()
		{
			input.value = '';
			find();
			input.focus();
		});
		
		inner.appendChild(cross);
		div.appendChild(inner);

		var center = document.createElement('center');
		var button = mxUtils.button(searchResource, function()
		{
			find();
		});
		button.setAttribute('disabled', 'true');
		// Workaround for inherited line-height in quirks mode
		button.style.lineHeight = 'normal';
		center.style.paddingTop = '4px';
		center.style.marginBottom = '12px';
		
		center.appendChild(button);
		div.appendChild(center);
		
		var searchTerm = '';
		var modified = false;
		var active = false;
		var complete = false;
		var page = 0;
		var count = 25;
		
		function clearDiv()
		{
			var child = div.firstChild;
			
			while (child != null)
			{
				var next = child.nextSibling;
				
				if (child != inner && child != center)
				{
					child.parentNode.removeChild(child);
				}
				
				child = next;
			}
		};
		
		find = mxUtils.bind(this, function(callback)
		{
			if (input.value != '' || (!modified && input.value == searchResource))
			{
				if (button.getAttribute('disabled') != 'true')
				{
					if (center.parentNode != null)
					{
						if (searchTerm != input.value)
						{
							clearDiv();
							searchTerm = input.value;
							complete = false;
							page = 0;
						}
						
						if (!active)
						{
							button.style.cursor = 'wait';
							button.innerHTML = mxResources.get('loading') + '...';
							active = true;
							mxUtils.get(ICONFINDER_PATH + '?q=' + encodeURIComponent(searchTerm) + '&c=' + count +
									'&p=' + page, mxUtils.bind(this, function(req)
							{
								active = false;
								page++;
								center.parentNode.removeChild(center);
								var icons = req.getXml().getElementsByTagName('icon');
								
								for (var i = 0; i < icons.length; i++)
								{
									var size = null;
									var url = null;
									var child = icons[i].firstChild;
									
									while (child != null && (size == null || url == null))
									{
										if (child.nodeName == 'size')
										{
											size = parseInt(mxUtils.getTextContent(child));
										}
										else if (child.nodeName == 'image')
										{
											url = mxUtils.getTextContent(child);
										}
		
										child = child.nextSibling;
									}
									
									if (size != null && url != null)
									{
										div.appendChild(this.createVertexTemplate('shape=image;image=' + url, size, size, ''));
									}
								}
								
								if (icons.length < count)
								{
									button.setAttribute('disabled', 'true');
									button.innerHTML = mxResources.get('noMoreResults');
									complete = true;
								}
								else
								{
									button.innerHTML = mxResources.get('moreResults');
								}
								
								button.style.cursor = '';
								
								if (icons.length == 0 && page == 1)
								{
									var err = document.createElement('div');
									err.className = 'geTitle';
									err.style.backgroundColor = 'transparent';
									err.style.borderColor = 'transparent';
									err.style.padding = '4px';
									err.style.textAlign = 'center';
									err.style.cursor = 'default';
									
									mxUtils.write(err, mxResources.get('noResultsFor', [searchTerm]));
									div.appendChild(err);
								}
								
								div.appendChild(center);
							},
							function()
							{
								button.style.cursor = '';
							}));
						}
					}
				}
			}
			else
			{
				clearDiv();
				searchTerm = '';
				button.innerHTML = searchResource;
				button.setAttribute('disabled', 'true');
			}
		});
		
		mxEvent.addListener(input, 'keydown', mxUtils.bind(this, function(evt)
		{
			if (evt.keyCode == 13 /* Enter */)
			{
				find();
			}
		}));
		
		mxEvent.addListener(input, 'keyup', mxUtils.bind(this, function(evt)
		{
			modified = true;
			
			if (input.value == '' || (!modified && input.value == searchResource))
			{
				button.setAttribute('disabled', 'true');
			}
			else if (input.value != searchTerm)
			{
				button.removeAttribute('disabled');
				button.innerHTML = searchResource;
			}
			else if (!active)
			{
				if (complete)
				{
					button.setAttribute('disabled', 'true');
					button.innerHTML = mxResources.get('noMoreResults');
				}
				else
				{
					button.removeAttribute('disabled');
					button.innerHTML = mxResources.get('moreResults');
				}
			}
		}));
		
		mxEvent.addListener(input, 'focus', mxUtils.bind(this, function(evt)
		{
			if (input.value == searchResource && !modified)
			{
				input.value = '';
			}
		}));
		
		mxEvent.addListener(input, 'blur', mxUtils.bind(this, function(evt)
		{
			if (input.value == '')
			{
				input.value = searchResource;
				modified = false;
			}
		}));
	    
	    // Workaround for blocked text selection in Editor
	    mxEvent.addListener(input, 'mousedown', function(evt)
	    {
	    	if (evt.stopPropagation)
	    	{
	    		evt.stopPropagation();
	    	}
	    	
	    	evt.cancelBubble = true;
	    });
	    
	    // Workaround for blocked text selection in Editor
	    mxEvent.addListener(input, 'selectstart', function(evt)
	    {
	    	if (evt.stopPropagation)
	    	{
	    		evt.stopPropagation();
	    	}
	    	
	    	evt.cancelBubble = true;
	    });
	    
		this.addFoldingHandler(elt, div, function()
		{
			// not lazy
		}, false);
	    
		var outer = document.createElement('div');
	    outer.appendChild(div);
	    this.container.appendChild(outer);
		
	    // Keeps references to the DOM nodes
    	this.palettes['images'] = [elt, outer];
 	};
 	
	// Adds BPMN shapes
	var sidebarAddBpmnPalette = Sidebar.prototype.addBpmnPalette;
	
	Sidebar.prototype.addBpmnPalette = function(dir, expand)
	{
		sidebarAddBpmnPalette.apply(this, arguments);

		var w = 50;
		var h = 50;

		this.addPalette('bpmnGateways', 'BPMN Gateways', false, mxUtils.bind(this, function(content)
		{
			var s = 'shape=mxgraph.bpmn.shape;verticalLabelPosition=bottom;verticalAlign=top;perimeter=rhombusPerimeter;background=gateway;';
			
			content.appendChild(this.createVertexTemplate(s + 'outline=none;symbol=exclusiveGw;', w, h, '', 'Exclusive Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=none;symbol=parallelGw;', w, h, '', 'Parallel Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=general;', w, h, '', 'Inclusive Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=none;symbol=complexGw;', w, h, '', 'Complex Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=general;', w, h, '', 'General Start Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=general;', w, h, '', 'General Intermediate Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=general;', w, h, '', 'General End Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=message;', w, h, '', 'Message Standard Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=message;', w, h, '', 'Message Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=message;', w, h, '', 'Message Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=message;', w, h, '', 'Message Catching Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=message;', w, h, '', 'Message Boundary Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=message;', w, h, '', 'Message Boundary Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=message;', w, h, '', 'Message Throwing Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=message;', w, h, '', 'Message End Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=timer;', w, h, '', 'Timer Standard Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=timer;', w, h, '', 'Timer Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=timer;', w, h, '', 'Timer Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=timer;', w, h, '', 'Timer Catching Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=timer;', w, h, '', 'Timer Boundary Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=timer;', w, h, '', 'Timer Boundary Non-Interrupting Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=escalation;', w, h, '', 'Escalation Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=escalation;', w, h, '', 'Escalation Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=escalation;', w, h, '', 'Escalation Boundary Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=escalation;', w, h, '', 'Escalation Boundary Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=escalation;', w, h, '', 'Escalation Throwing Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=escalation;', w, h, '', 'Escalation End Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=conditional;', w, h, '', 'Conditional Standard Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=conditional;', w, h, '', 'Conditional Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=conditional;', w, h, '', 'Conditional Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=conditional;', w, h, '', 'Conditional Catching Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=conditional;', w, h, '', 'Conditional Boundary Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=conditional;', w, h, '', 'Conditional Boundary Non-Interrupting Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=link;', w, h, '', 'Link Catching Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=link;', w, h, '', 'Link Throwing Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=error;', w, h, '', 'Error Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=error;', w, h, '', 'Error Boundary Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=error;', w, h, '', 'Error End Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=cancel;', w, h, '', 'Cancel Boundary Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=cancel;', w, h, '', 'Cancel End Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=compensation;', w, h, '', 'Compensation Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=compensation;', w, h, '', 'Compensation Boundary Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=compensation;', w, h, '', 'Compensation Throwing Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=compensation;', w, h, '', 'Compensation End Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=signal;', w, h, '', 'Signal Standard Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=signal;', w, h, '', 'Signal Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=signal;', w, h, '', 'Signal Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=signal;', w, h, '', 'Signal Catching Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=signal;', w, h, '', 'Signal Boundary Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=signal;', w, h, '', 'Signal Boundary Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=signal;', w, h, '', 'Signal Throwing Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=signal;', w, h, '', 'Signal End Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=multiple;', w, h, '', 'Multiple Standard Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=multiple;', w, h, '', 'Multiple Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=multiple;', w, h, '', 'Multiple Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=multiple;', w, h, '', 'Multiple Catching Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=multiple;', w, h, '', 'Multiple Boundary Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=multiple;', w, h, '', 'Multiple Boundary Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=multiple;', w, h, '', 'Multiple Throwing Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=multiple;', w, h, '', 'Multiple End Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Standard Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Non-Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Catching Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Boundary Interrupting Gateway', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Boundary Non-Interrupting Gateway', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=terminate;', w, h, '', 'Terminate Gateway', false));
		}));
		
		this.addPalette('bpmnEvents', 'BPMN Events', false, mxUtils.bind(this, function(content)
		{
			var s = 'shape=mxgraph.bpmn.shape;verticalLabelPosition=bottom;verticalAlign=top;perimeter=ellipsePerimeter;';

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=general;', w, h, '', 'General Start', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=general;', w, h, '', 'General Intermediate', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=general;', w, h, '', 'General End', false));
			
			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=message;', w, h, '', 'Message Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=message;', w, h, '', 'Message Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=message;', w, h, '', 'Message Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=message;', w, h, '', 'Message Catching', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=message;', w, h, '', 'Message Boundary Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=message;', w, h, '', 'Message Boundary Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=message;', w, h, '', 'Message Throwing', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=message;', w, h, '', 'Message End', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=timer;', w, h, '', 'Timer Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=timer;', w, h, '', 'Timer Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=timer;', w, h, '', 'Timer Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=timer;', w, h, '', 'Timer Catching', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=timer;', w, h, '', 'Timer Boundary Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=timer;', w, h, '', 'Timer Boundary Non-Interrupting', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=escalation;', w, h, '', 'Escalation Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=escalation;', w, h, '', 'Escalation Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=escalation;', w, h, '', 'Escalation Boundary Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=escalation;', w, h, '', 'Escalation Boundary Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=escalation;', w, h, '', 'Escalation Throwing', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=escalation;', w, h, '', 'Escalation End', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=conditional;', w, h, '', 'Conditional Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=conditional;', w, h, '', 'Conditional Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=conditional;', w, h, '', 'Conditional Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=conditional;', w, h, '', 'Conditional Catching', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=conditional;', w, h, '', 'Conditional Boundary Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=conditional;', w, h, '', 'Conditional Boundary Non-Interrupting', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=link;', w, h, '', 'Link Catching', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=link;', w, h, '', 'Link Throwing', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=error;', w, h, '', 'Error Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=error;', w, h, '', 'Error Boundary Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=error;', w, h, '', 'Error End', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=cancel;', w, h, '', 'Cancel Boundary Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=cancel;', w, h, '', 'Cancel End', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=compensation;', w, h, '', 'Compensation Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=compensation;', w, h, '', 'Compensation Boundary Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=compensation;', w, h, '', 'Compensation Throwing', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=compensation;', w, h, '', 'Compensation End', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=signal;', w, h, '', 'Signal Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=signal;', w, h, '', 'Signal Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=signal;', w, h, '', 'Signal Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=signal;', w, h, '', 'Signal Catching', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=signal;', w, h, '', 'Signal Boundary Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=signal;', w, h, '', 'Signal Boundary Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=signal;', w, h, '', 'Signal Throwing', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=signal;', w, h, '', 'Signal End', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=multiple;', w, h, '', 'Multiple Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=multiple;', w, h, '', 'Multiple Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=multiple;', w, h, '', 'Multiple Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=multiple;', w, h, '', 'Multiple Catching', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=multiple;', w, h, '', 'Multiple Boundary Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=multiple;', w, h, '', 'Multiple Boundary Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=throwing;symbol=multiple;', w, h, '', 'Multiple Throwing', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=multiple;', w, h, '', 'Multiple End', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=standard;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventInt;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=eventNonint;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Non-Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=catching;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Catching', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundInt;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Boundary Interrupting', false));
			content.appendChild(this.createVertexTemplate(s + 'outline=boundNonint;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Boundary Non-Interrupting', false));

			content.appendChild(this.createVertexTemplate(s + 'outline=end;symbol=terminate;', w, h, '', 'Terminate', false));
		}));
	};
	
	// Adds ER shapes
	Sidebar.prototype.addErPalette = function()
	{
		var w = 100;
		var h = 100;

		this.addPalette('er', mxResources.get('entityRelation'), false, mxUtils.bind(this, function(content)
		{
			var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=2;';
			var s2 = mxConstants.STYLE_STROKEWIDTH + '=2;';
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.er.attribute;buttonText=;fontColor=#000000;fontSize=17;buttonStyle=dblFrame;fillColor=#ffffff;', w, h, 'Attribute', 'Attribute', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.er.cloud;buttonText=;fontColor=#000000;fontSize=17;', w, h, 'Cloud', 'Cloud', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.er.entity;fontColor=#666666;buttonStyle=round;fillColor=#ffffff;buttonText=;', w, h, 'Entity1', 'Entity', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.er.entity;fontColor=#666666;buttonStyle=rect;fillColor=#ffffff;buttonText=;', w, h, 'Entity1', 'Entity', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.er.entity;fontColor=#666666;buttonStyle=dblFrame;fillColor=#ffffff;buttonText=;', w, h, 'Entity1', 'Entity', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.er.has;buttonText=;fontSize=17;buttonStyle=rhombus;', w, h, 'Has', 'Has', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.er.hierarchy;buttonText=;subText=;fontSize=17;html=1;buttonStyle=round;overflow=width;', w, h,
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;margin-bottom:14px;"><tr><td align="center" width="50%">main</td><td align="center" style="padding:10px;padding-left:0px;" width="50%">sub</td></tr></table>', 'Hierarchy', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.er.note;buttonText=;fontSize=17;fillColor2=#ffffff;', w, h, 'Note', 'Note', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.er.entityExt;buttonText=;verticalAlign=top;fillColor=#008cff;fontSize=17;subText=;overflow=fill;html=1;', w, h,
					// TODO: Add cellpadding/spacing in all tables
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;"><tr style="height:20px;"><td align="center" style="color:white;">Entity</td></tr><tr><td align="left" valign="top" style="padding:4px;">+ Attribute 1<br>+ Attribute 2<br>+ Attribute 3</td></tr></table>', 'Entity Extended', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.er.ie;textColor=#000000;fontSize=17;', w * 3.5, h * 1.2, '', 'ERD Information Engineering Notation', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.er.bachmans;textColor=#000000;fontSize=17;', w * 3, h * 2, '', 'ERD Bachman\'s Notation', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.er.chens;textColor=#000000;fontSize=17;', w * 3, h, '', 'ERD Chen\'s Notation', false));

			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_ENDARROW + '=ERzeroToMany;endFill=1;', w, h, '', '0 to many optional', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_ENDARROW + '=ERoneToMany;', w, h, '', '1 to many', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_ENDARROW + '=ERmandOne;', w, h, '', '1 mandatory', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_STARTARROW + '=ERmandOne;' + mxConstants.STYLE_ENDARROW + '=ERmandOne;', w, h, '', '1 to 1', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_ENDARROW + '=ERone;endFill=1;', w, h, '', '1', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_ENDARROW + '=ERzeroToOne;endFill=1;', w, h, '', '0 to 1', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_ENDARROW + '=ERmany;endFill=1;', w, h, '', 'Many', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_STARTARROW + '=ERmany;' + mxConstants.STYLE_ENDARROW + '=ERmany;', w, h, '', 'Many to many', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_STARTARROW + '=ERzeroToOne;' + mxConstants.STYLE_ENDARROW + '=ERzeroToMany;', w, h, '', '1 optional to many optional', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_STARTARROW + '=ERmandOne;' + mxConstants.STYLE_ENDARROW + '=ERzeroToMany;', w, h, '', '1 mandatory to many optional', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_STARTARROW + '=ERmandOne;' + mxConstants.STYLE_ENDARROW + '=ERoneToMany;', w, h, '', '1 mandatory to many mandatory', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_STARTARROW + '=ERzeroToOne;' + mxConstants.STYLE_ENDARROW + '=ERoneToMany;', w, h, '', '1 optional to many mandatory', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_STARTARROW + '=ERoneToMany;' + mxConstants.STYLE_ENDARROW + '=ERoneToMany;', w, h, '', 'Many mandatory to many mandatory', false));
			content.appendChild(this.createEdgeTemplate('edgeStyle=none;' + mxConstants.STYLE_STARTARROW + '=ERzeroToMany;' + mxConstants.STYLE_ENDARROW + '=ERoneToMany;', w, h, '', 'Many optional to many mandatory', false));
		}));
	};
	
	// ER markers
	mxMarker.addMarker('ERone', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var nx = unitX * (size + sw + 1);
		var ny = unitY * (size + sw + 1);

		return function()
		{
			c.begin();
			c.moveTo(pe.x - nx / 2 - ny / 2, pe.y - ny / 2 + nx / 2);
			c.lineTo(pe.x - nx / 2 + ny / 2, pe.y - ny / 2 - nx / 2);
			c.stroke();
		};
	});

	mxMarker.addMarker('ERmandOne', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var nx = unitX * (size + sw + 1);
		var ny = unitY * (size + sw + 1);

		return function()
		{
			c.begin();
			c.moveTo(pe.x - nx / 2 - ny / 2, pe.y - ny / 2 + nx / 2);
			c.lineTo(pe.x - nx / 2 + ny / 2, pe.y - ny / 2 - nx / 2);
			c.moveTo(pe.x - nx - ny / 2, pe.y - ny + nx / 2);
			c.lineTo(pe.x - nx + ny / 2, pe.y - ny - nx / 2);
			c.stroke();
		};
	});

	mxMarker.addMarker('ERmany', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var nx = unitX * (size + sw + 1);
		var ny = unitY * (size + sw + 1);

		return function()
		{
			c.begin();
			c.moveTo(pe.x + ny / 2, pe.y - nx / 2);
			c.lineTo(pe.x - nx, pe.y - ny);
			c.lineTo(pe.x - ny / 2, pe.y + nx / 2);
			c.stroke();
		};
	});

	mxMarker.addMarker('ERoneToMany', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var nx = unitX * (size + sw + 1);
		var ny = unitY * (size + sw + 1);

		return function()
		{
			c.begin();
			c.moveTo(pe.x - nx - ny / 2, pe.y - ny + nx / 2);
			c.lineTo(pe.x - nx + ny / 2, pe.y - ny - nx / 2);
			c.moveTo(pe.x + ny / 2, pe.y - nx / 2);
			c.lineTo(pe.x - nx, pe.y - ny);
			c.lineTo(pe.x - ny / 2, pe.y + nx / 2);
			c.stroke();
		};
	});

	mxMarker.addMarker('ERzeroToMany', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var nx = unitX * (size + sw + 1);
		var ny = unitY * (size + sw + 1);
		var a = size / 2;

		return function()
		{
			c.begin();
			c.ellipse(pe.x - 1.5 * nx - a, pe.y - 1.5 * ny - a, 2 * a, 2 * a);

			if (filled)
			{
				// TODO not sure if this is ok, because by default, markers use strokeColor for filling 
				var oldColor = mxUtils.getValue(shape.style, mxConstants.STYLE_STROKECOLOR, '#666666');
				
				c.setFillColor('#ffffff');
				c.fillAndStroke();
				c.setFillColor(oldColor);
			}
			else
			{
				c.stroke();
			}

			c.begin();
			c.moveTo(pe.x + ny / 2, pe.y - nx / 2);
			c.lineTo(pe.x - nx, pe.y - ny);
			c.lineTo(pe.x - ny / 2, pe.y + nx / 2);
			c.stroke();
		};
	});

	mxMarker.addMarker('ERzeroToOne', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var nx = unitX * (size + sw + 1);
		var ny = unitY * (size + sw + 1);
		var a = size / 2;

		return function()
		{
			c.begin();
			c.ellipse(pe.x - 1.5 * nx - a, pe.y - 1.5 * ny - a, 2 * a, 2 * a);

			if (filled)
			{
				// TODO not sure if this is ok, because by default, markers use strokeColor for filling 
				var oldColor = mxUtils.getValue(shape.style, mxConstants.STYLE_STROKECOLOR, '#666666');
				
				c.setFillColor('#ffffff');
				c.fillAndStroke();
				c.setFillColor(oldColor);
			}
			else
			{
				c.stroke();
			}

			c.begin();
			c.moveTo(pe.x - nx / 2 - ny / 2, pe.y - ny / 2 + nx / 2);
			c.lineTo(pe.x - nx / 2 + ny / 2, pe.y - ny / 2 - nx / 2);
			c.stroke();
		};
	});
	
	// Adds Rack shapes
	Sidebar.prototype.addRackGeneralPalette = function()
	{
		this.addPalette('rackGeneral', 'Rack / General', false, mxUtils.bind(this, function(content)
		{
			var s = 'strokeColor=#666666;';
			
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.rackNumbering;unitNum=42;unitHeight=14.8;textSize=12;textColor=#666666;numDir=descend;', 196.9, 621.6, '', 'Rack Numbering', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.rackCabinet;unitNum=12;unitHeight=14.8;textSize=12;textColor=#666666;numDir=descend;numDisp=off;', 180, 228.6, '', 'Rack Cabinet', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.rackCabinet;unitNum=12;unitHeight=14.8;textSize=12;textColor=#666666;numDir=descend;numDisp=on;', 210, 228.6, '', 'Rack Cabinet', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.horCableDuct1U;', 160.9, 14.8, '', 'Horizontal Cable Duct 1U', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.horCableDuct2U;', 160.9, 29.6, '', 'Horizontal Cable Duct 2U', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.horRoutingBank1U;', 160.9, 14.8, '', 'Horizontal Routing Bank 1U', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.horRoutingBank2U;', 160.9, 29.6, '', 'Horizontal Routing Bank 2U', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.neatPatch2U;', 160.9, 29.6, '', 'Neat-Patch 2U', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.shelf1U;', 160.9, 14.8, '', 'Shelf 1U', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.shelf2U;', 160.9, 29.6, '', 'Shelf 2U', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.shelf4U;', 160.9, 59.2, '', 'Shelf 4U', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rackGeneral.channelBase;', 200, 29.6, '', 'Channel Base', true));
			content.appendChild(this.createVertexTemplate('shape=mxgraph.rackGeneral.cabinetLeg;fillColor=#444444;strokeColor=#444444;', 50, 50, '', 'Cabinet Leg', true));

			//stencils
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.12u_rack_19_standard;', 180, 219.54, '', '12U Rack 19 Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.26u_rack_19_standard;', 180, 427, '', '26U Rack 19 Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.36u_rack_19_standard;', 180, 575.56, '', '36U Rack 19 Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.40u_rack_19_standard;', 180, 634.5, '', '40U Rack 19 Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.42u_rack_19_standard;', 180, 664.1, '', '42U Rack 19 Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.44u_rack_19_standard;', 180, 693.74, '', '44U Rack 19 Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.47u_rack_19_ibm;', 180, 753.24, '', '47U Rack 19 IBM', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.48u_rack_19_standard;', 180, 753.24, '', '48U Rack 19 Standard', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.1u;', 160.9, 14.8, '', '1U', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.2u;', 160.9, 29.6, '', '2U', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.3u;', 160.9, 44.4, '', '3U', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.4u;', 160.9, 59.2, '', '4U', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.5u;', 160.9, 74, '', '5U', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.6u;', 160.9, 88.8, '', '6U', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.1u_rack_server;', 160.9, 14.8, '', '1U Rack Server', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.2u_rack_server;', 160.9, 29.6, '', '2U Rack Server', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.3u_rack_server;', 160.9, 44.4, '', '3U Rack Server', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.cat5e_enhanced_patch_panel_48_ports;', 160.9, 29.6, '', 'CAT5e Enhanced Patch Panel 48 ports', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.cat5e_rack_mount_patch_panel_24_ports;', 160.9, 14.8, '', 'CAT5e Rack Mount Patch Panel 24 ports', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.cat5e_rack_mount_patch_panel_96_ports;', 160.9, 59.2, '', 'CAT5e Rack Mount Patch Panel 96 ports', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.hub;', 160.9, 29.6, '', 'Hub', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.server_1;', 73.25, 74, '', 'Server 1', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.server_2;', 73.33, 153.25, '', 'Server 2', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.server_3;', 73, 153, '', 'Server 3', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.switches_1;', 160.9, 29.6, '', 'Switches 1', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.rack.general.switches_2;', 160.9, 29.6, '', 'Switches 2', false));
		}));
	};
	
	// Adds iOS shapes
	Sidebar.prototype.addIosPalette = function()
	{
		this.addPalette('ios', 'iOS', false, mxUtils.bind(this, function(content)
		{
			var sizeX = 200; //reference size for iPhone and all other iOS shapes
			
			var sizeY = 2 * sizeX; //change only sizeX, to avoid changing aspect ratio
			
			var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=1;';
			var s2 = mxConstants.STYLE_STROKEWIDTH + '=1;';

			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPhone;bgStyle=bgGreen;fillColor=#aaaaaa;', sizeX, sizeY, '', 'iPhone (portrait)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPhone;direction=north;bgStyle=bgGreen;fillColor=#aaaaaa;', sizeY, sizeX, '', 'iPhone (landscape)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPad;bgStyle=bgGreen;fillColor=#aaaaaa;', sizeX * 2.425, sizeY * 1.5625, '', 'iPad (portrait)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPad;direction=north;bgStyle=bgGreen;fillColor=#aaaaaa;', sizeY * 1.5625, sizeX * 2.425, '', 'iPad (landscape)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iBgFlat;strokeColor=#18211b;fillColor=#ffffff', sizeX * 0.875, sizeY * 0.7, '', 'iPad background (white)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iBgFlat;strokeColor=#18211b;fillColor=#1f2923', sizeX * 0.875, sizeY * 0.7, '', 'iPad background (green)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iBgFlat;strokeColor=#18211b;fillColor=#dddddd', sizeX * 0.875, sizeY * 0.7, '', 'iPad background (gray)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iBgStriped;strokeColor=#18211b;fillColor=#5D7585;strokeColor2=#657E8F;', sizeX * 0.875, sizeY * 0.7, '', 'iPad background (striped)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iBgMap;strokeColor=#18211b;fillColor=#ffffff;strokeColor2=#008cff;fillColor2=#96D1FF;', sizeX * 0.875, sizeY * 0.7, '', 'iPad background (map)', false));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iButtonBar;strokeColor=#444444;strokeColor2=#c4c4c4;fillColor2=#ffffff;buttonText=,+,,;fontSize=8;fillColor=#ffffff;overflow=fill;html=1;', sizeX * 0.825, sizeY * 0.125,
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#666666;width:100%;height:100%;margin-left:11px;margin-top:1px;"><tr><td align="left">Item 1</td></tr><tr><td align="left" style="color:white;">Item 2</td></tr><tr><td align="left">Item 3</td></tr><tr><td align="left">Item 4</td></tr></table>', 'Button bar', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iAppBar;', sizeX * 0.87, sizeY * 0.0375, '', 'App bar (portrait)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iAppBar;', sizeX * 1.395, sizeY * 0.0375, '', 'App bar (landscape)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iTopBar;', sizeX * 0.87, sizeY * 0.0375, '', 'Top bar', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iTopBarLocked;', sizeX * 0.87, sizeY * 0.0375, '', 'Top bar locked', false));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iButton;strokeColor=#444444;fontColor=#ffffff;buttonText=;fontSize=8;fillColor=#dddddd;fillColor2=#3D5565;', sizeX * 0.2175, sizeY * 0.0375, 'Button', 'Button', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iButtonBack;strokeColor=#444444;fontColor=#ffffff;buttonText=;fontSize=8;fillColor=#dddddd;fillColor2=#3D5565;spacingLeft=10;', sizeX * 0.2175, sizeY * 0.0375, 'Button', 'Back button', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iButtonFw;strokeColor=#444444;fontColor=#ffffff;buttonText=;fontSize=8;fillColor=#dddddd;fillColor2=#3D5565;spacingRight=10;', sizeX * 0.2175, sizeY * 0.0375, 'Button', 'Forward button', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPrevNext;strokeColor=#444444;fillColor=#dddddd;fillColor2=#3D5565;fillColor3=#ffffff;', sizeX * 0.2175, sizeY * 0.0375, '', 'Prev/next button', false));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iTextInput;strokeColor=#444444;fontColor=#000000;buttonText=;fontSize=8;fillColor=#ffffff;', sizeX * 0.2175, sizeY * 0.0375, 'Default text', 'Text input', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iRadioGroup;strokeColor=#666666;buttonText=,,+,;fontSize=8;fillColor=#ffffff;overflow=fill;html=1;', sizeX * 0.825, sizeY * 0.125,
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#666666;width:100%;height:100%;margin-left:13px;"><tr><td align="left">Option 1</td></tr><tr><td align="left">Option 2</td></tr><tr><td align="left">Option 3</td></tr><tr><td align="left">Option 4</td></tr></table>', 'Radiobuttons', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iCheckboxGroup;strokeColor=#666666;buttonText=,,+,;fontSize=8;fillColor=#ffffff;overflow=fill;html=1;', sizeX * 0.825, sizeY * 0.125,
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#666666;width:100%;height:100%;margin-left:13px;"><tr><td align="left">Setting 1</td></tr><tr><td align="left">Setting 2</td></tr><tr><td align="left">Setting 3</td></tr><tr><td align="left">Setting 4</td></tr></table>', 'Checkboxes', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iComboBox;spacingTop=2;spacingLeft=2;align=left;strokeColor=#444444;fontColor=#666666;buttonText=;fontSize=8;fillColor=#dddddd;fillColor2=#3D5565;', sizeX * 0.29, sizeY * 0.0375, 'Option 1', 'Combobox', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iOnOffButton;mainText=;strokeColor=#444444;fontSize=9;fontColor=#ffffff;spacingRight=14;buttonState=on', sizeX * 0.2175, sizeY * 0.0375, 'ON', 'On-off button', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iTextInput;strokeColor=#444444;fontColor=#000000;align=left;buttonText=;fontSize=8;fillColor=#ffffff;', sizeX * 0.2175, sizeY * 0.0375, '********', 'Password field', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iAlertBox;buttonText=,,,;fontSize=9;overflow=fill;html=1;', sizeX * 0.75, sizeY * 0.25,
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#ffffff;width:100%;height:100%;"><tr style="height:20%"><td align="center" valign="bottom" style="font-size:10pt;">Something happened</td></tr><tr><td align="center">Alert description text<br>description text second line</td></tr><tr style="height:26px;spacing-bottom:12px;"><td align="center">Button</td></tr></table>', 'Alert box', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iDialogBox;buttonText=,,,,;fontSize=9;overflow=fill;html=1;', sizeX * 0.75, sizeY * 0.25,
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#ffffff;color:inherit;width:100%;height:100%;"><tr style="height:20%"><td align="center" valign="bottom" style="font-size:10pt;" colspan="2">Something happened</td></tr><tr><td align="center" colspan="2">Alert description text<br>description text second line</td></tr><tr style="height:26px;spacing-bottom:12px;"><td align="center" width="50%">Cancel</td><td align="center" width="50%">OK</td></tr></table>', 'Dialog box', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iLockButton;fontColor=#cccccc;fontSize=13;mainText=;spacingLeft=50;spacingRight=10;', sizeX * 0.87, sizeY * 0.125, 'slide to unlock', 'Lock button', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iArrowIcon;fillColor=#8BbEff;fillColor2=#135Ec8;strokeColor=#ffffff;', sizeX * 0.075, sizeY * 0.0375, '', 'Arrow', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iDeleteIcon;fillColor=#e8878E;fillColor2=#BD1421;strokeColor=#ffffff;', sizeX * 0.075, sizeY * 0.0375, '', 'Delete', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iAddIcon;fillColor=#7AdF78;fillColor2=#1A9917;strokeColor=#ffffff;', sizeX * 0.075, sizeY * 0.0375, '', 'Add', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iInfoIcon;fillColor=#8BbEff;fillColor2=#135Ec8;strokeColor=#ffffff;', sizeX * 0.075, sizeY * 0.0375, '', 'Info', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iSortFindIcon;fillColor=#8BbEff;fillColor2=#135Ec8;strokeColor=#ffffff;', sizeX * 0.075, sizeY * 0.0375, '', 'Sort/find', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iCheckIcon;fillColor=#e8878E;fillColor2=#BD1421;strokeColor=#ffffff;', sizeX * 0.075, sizeY * 0.0375, '', 'Check', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iKeybLett;', sizeX * 0.87, sizeY * 0.25, '', 'Keyboard (letters)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iKeybNumb;', sizeX * 0.87, sizeY * 0.25, '', 'Keyboard (numbers)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iKeybSymb;', sizeX * 0.87, sizeY * 0.25, '', 'Keyboard (symbols)', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iDeleteApp;fillColor=#cccccc;fillColor2=#000000;strokeColor=#ffffff;', sizeX * 0.075, sizeY * 0.0375, '', 'Delete app', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iDir;', sizeX * 0.5, sizeY * 0.25, '', 'Direction', false));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iLocBar;align=left;spacingLeft=4;spacingBottom=4;fontColor=#ffffff;fontSize=10;barPos=80;pointerPos=bottom;buttonText=', sizeX * 0.775, sizeY * 0.08125, '5th Street Music Store', 'Location bar', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iCallDialog;', sizeX * 0.75, sizeY * 0.3125, '', 'Call Dialog', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iCallButtons;', sizeX * 0.87, sizeY * 0.575, '', 'Call buttons', false));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iOption;barPos=80;pointerPos=bottom;buttonText=;fontSize=10;fontColor=#ffffff;spacingBottom=6;', sizeX * 0.375, sizeY * 0.06875, 'Option', 'Option', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iAlphaList;fontSize=7.5;', sizeX * 0.075, sizeY * 0.5625, '', 'Alphabet list', false));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iHorButtonBar;strokeColor=#444444;strokeColor2=#c4c4c4;fillColor2=#ffffff;buttonText=,+,,;overflow=width;html=1;fontSize=8;fillColor=#ffffff;fillColor2=#008cff', sizeX * 0.825, sizeY * 0.03125,
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;;color:#666666;width:100%;"><tr><td align="center" width="25%">Item 1</td><td align="center" style="color:white;" width="25%">Item 2</td><td align="center" width="25%">Item 3</td><td align="center" width="25%">Item 4</td></tr></table>', 'Horizontal button bar', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPin;fillColor2=#00dd00;fillColor3=#004400;strokeColor=#006600;', sizeX * 0.05, sizeY * 0.0625, '', 'Pin', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPin;fillColor2=#dd0000;fillColor3=#440000;strokeColor=#660000;', sizeX * 0.05, sizeY * 0.0625, '', 'Pin', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPin;fillColor2=#ccccff;fillColor3=#0000ff;strokeColor=#000066;', sizeX * 0.05, sizeY * 0.0625, '', 'Pin', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPin;fillColor2=#ffff00;fillColor3=#888800;strokeColor=#999900;', sizeX * 0.05, sizeY * 0.0625, '', 'Pin', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPin;fillColor2=#ffa500;fillColor3=#885000;strokeColor=#997000;', sizeX * 0.05, sizeY * 0.0625, '', 'Pin', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iVideoControls;barPos=10;', sizeX * 0.87, sizeY * 0.125, '', 'Video controls', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iURLBar;buttonText=Page title,http://www.draw.io,Cancel;', sizeX * 0.87, sizeY * 0.075, '', 'URL bar', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iSlider;barPos=20;', sizeX * 0.75, sizeY * 0.025, '', 'Slider', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iProgressBar;barPos=40;', sizeX * 0.75, sizeY * 0.025, '', 'Progress bar', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iCloudProgressBar;barPos=20;', sizeX * 0.75, sizeY * 0.025, '', 'Cloud progress bar', false));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iDownloadBar;verticalAlign=top;spacingTop=-4;fontSize=8;fontColor=#ffffff;buttonText=' + ';barPos=30;', sizeX * 0.87, sizeY * 0.075, 'Downloading 2 of 6', 'Download bar', true));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iScreenNameBar;fillColor2=#000000;fillColor3=#ffffff;buttonText=;fontColor=#ffffff;fontSize=10;', sizeX * 0.87, sizeY * 0.0625, 'Screen Name', 'Screen name bar', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iIconGrid;fillColor=#ffffff;strokeColor=#000000;gridSize=3,3;', sizeX * 0.75, sizeY * 0.375, '', 'Icon grid', false));
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iCopy;fillColor=#000000;strokeColor=#000000;buttonText=;fontColor=#ffffff;spacingBottom=6;fontSize=9;fillColor2=#000000;fillColor3=#ffffff;', sizeX * 0.2, sizeY * 0.06875, 'Copy', 'Copy', true));
			// LATER: Remove button from copy area shape (can use area and icopy shape instead as a group)
			content.appendChild(this.createVertexTemplate(s2 + 'shape=mxgraph.ios.iCopyArea;strokeColor=#000000;buttonText=;fontColor=#ffffff;fontSize=9;verticalAlign=top;spacingTop=-2;fillColor2=#000000;fillColor3=#ffffff;', sizeX * 0.3, sizeY * 0.2, 'Copy', 'Copy area', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iHomePageControl;fillColor=#666666;strokeColor=#cccccc;', sizeX * 0.25, sizeY * 0.0125, '', 'Home page control', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.ios.iPageControl;fillColor=#666666;strokeColor=#cccccc;', sizeX * 0.25, sizeY * 0.0125, '', 'Page control', false));
		}));
	};
	
	// Adds Lean Mapping shapes
	Sidebar.prototype.addLeanMappingPalette = function()
	{
		var w = 100;
		var h = 100;

		this.addPalette('lean_mapping', 'Lean Mapping', false, mxUtils.bind(this, function(content)
		{
			var s = mxConstants.STYLE_STROKEWIDTH + '=2;';
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.boat_shipment;', w, h, '', 'Boat Shipment', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.data_box;fontSize=8;html=1;overflow=fill;', w * 0.6, h, 
						'<table cellpadding="5" cellspacing="0" style="font-size:1em;width:100%;height:100%;">' +
						'<tr><td align="left" height="20%">C/T=</td></tr>' +
						'<tr><td align="left" height="20%">C/O=</td></tr>' +
						'<tr><td align="left" height="20%">Batch=</td></tr>' +
						'<tr><td align="left" height="20%">Avail=</td></tr>' +
						'<tr><td align="left" height="20%"></td></tr></table>',
						'Data Box', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.outside_sources;html=1;overflow=fill;', w, h * 0.7, 
					'<table cellpadding="5" cellspacing="0" style="font-size:1em;width:100%;height:100%;">' +
					'<tr><td height="50%"></td></tr>' +
					'<tr><td align="center" height="50%">XYZ Corp</td></tr></table>',
					'Customer/Supplier', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.manufacturing_process;html=1;overflow=fill;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;', w, h * 0.7, 
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;">' +
					'<tr><td height="0%">Process</td></tr>' +
					'<tr><td align="center" height="100%">Description</td></tr></table>',
					'Dedicated Process', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.manufacturing_process_shared;html=1;overflow=fill;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;', w, h * 0.7, 
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;">' +
					'<tr><td height="0%">Process</td></tr>' +
					'<tr><td align="center" height="100%"></td></tr></table>',
					'Shared Process', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.work_cell;', w * 0.7, h * 0.6, '', 'Workcell', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.inventory_box;', w, h * 0.9, '', 'Inventory Box', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.push_arrow;', w, h * 0.3,'', 'Push Arrow', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.supermarket;', w * 0.6, h,'', 'Supermarket', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.physical_pull;', w, h,'', 'Material Pull', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.fifo_lane;html=1;overflow=fill;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;', w, h * 0.5, 
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;">' +
					'<tr><td height="0%">MAX=XX</td></tr>' +
					'<tr><td align="center" height="100%"></td></tr></table>',
					'FIFO Lane', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.buffer_or_safety_stock;', w * 0.4, h,'', 'Safety Stock', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.truck_shipment;html=1;overflow=fill;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;', w, h, 
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:60%;height:100%;">' +
					'<tr><td align="center" height="80%">2x per<br>Week</td></tr>' +
					'<tr><td align="center" height="20%"></td></tr></table>',
					'Truck Shipment', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.schedule;', w, h * 0.7,'Production\nControl', 'Production Control', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.schedule;', w, h * 0.7,'Other\nInformation', 'Other Information', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.go_see_production_scheduling;', 92, 60, '', 'Go See Production Scheduling', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.kaizen_lightening_burst;', 90, 40, '', 'Kaizen Lightening Burst', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.kanban_post;', 50, 100, '', 'Kanban Post', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.load_leveling;', 100, 30, '', 'Load Leveling', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.move_by_forklift;', 92, 100, '', 'Move by Forklift', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.mrp_erp;', 70, 100, '', 'MRP/ERP', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.operator;', 100, 84, '', 'Operator', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.quality_problem;', 80, 100, '', 'Quality Problem', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.verbal;', 50, 100, '', 'Verbal Information', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.fifo_sequence_flow;', w, h * 0.5, '', 'FIFO Sequence', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.production_kanban;', w, h, '', 'Production Kanban', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.withdrawal_kanban;', w, h, '', 'Withdrawal Kanban', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.signal_kanban;', w, h * 0.9, '', 'Signal Kanban', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.sequenced_pull_ball;', w * 0.6, h * 0.6, '', 'Sequenced Pull Ball', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.rail_shipment;', w, h * 0.3, '', 'Rail Shipment', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.airplane_7;', 100, 45, '', 'Air Freight', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.warehouse;', w, h * 0.6, '', 'Warehouse', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.timeline;mainText=20,N1,50,V1,30,N2,40,V2,30,N3,50,V3,20,N4;', w * 4, h * 0.6, '', 'Timeline', true));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.crossDock;', w, h * 0.8, '', 'Cross-Dock', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.orders;', w, h * 0.6, '', 'Orders', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.batched_kanban;', w * 2, h * 0.8, '', 'Batched Kanban', false));
			content.appendChild(this.createVertexTemplate(s + 'shape=mxgraph.lean_mapping.control_center;', w * 0.8, h * 0.8, '', 'Control Center', false));
		    content.appendChild(this.createEdgeTemplate('arrow', 100, 100, '', 'Shipments', true));
		    content.appendChild(this.createEdgeTemplate('shape=mxgraph.lean_mapping.manual_info_flow', 100, 100, 'Daily', 'Manual Information', true));
		    content.appendChild(this.createEdgeTemplate('shape=mxgraph.lean_mapping.electronic_info_flow', 100, 100, 'Monthly', 'Electronic Information', true));
		}));
	};
	
	// Adds mockup shapes
	Sidebar.prototype.addMockups = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=1;' + mxConstants.STYLE_SHAPE;
		var s2 =mxConstants.STYLE_STROKEWIDTH + '=1;' + mxConstants.STYLE_SHAPE;
		// Space savers
		var skcl6 = mxConstants.STYLE_STROKECOLOR + '=#666666;';
		var skcl9 = mxConstants.STYLE_STROKECOLOR + '=#999999;';
		var flclf = mxConstants.STYLE_FILLCOLOR + '=#ffffff;';
		var skclN = mxConstants.STYLE_STROKECOLOR + '=none;';

		this.addPalette('mockupButtons', 'Mockup Buttons', false, mxUtils.bind(this, function(content)
		{
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.buttons.button;' + skcl6 + 'fontColor=#ffffff;mainText=;buttonStyle=round;fontSize=17;fontStyle=1;fillColor=#008cff',
										150, 50, 'Button Text', 'Button', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.buttons.multiButton;' + skcl6 + 'Color=#ffffff;mainText=;subText=;html=1;fontColor=#ffffff;buttonStyle=round;fillColor=#008cff',
										150, 50, '<strong style="font-size:140%;">Main Text</strong><br><b>Sub text</b>', 'Formatted Button', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.buttons.horButtonBar;' + skcl6 + 'strokeColor2=#c4c4c4;mainText=+,,,;fontSize=17;fontStyle=1;' + flclf + 'fillColor2=#008cff;overflow=width;html=1;spacingTop=4;',
					500, 50, '<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#666666;width:100%;"><tr><td align="center" style="color:white;" width="25%">Button 1</td><td align="center" width="25%">Button 2</td><td align="center" width="25%">Button 3</td><td align="center" width="25%">Button 4</td></tr></table>', 'Horizontal Button Bar', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.buttons.verButtonBar;' + skcl6 + 'strokeColor2=#c4c4c4;textColor2=#ffffff;textColor=#666666;mainText=+,,,;' + flclf + 'fillColor2=#008cff;textSize=17;html=1;fontStyle=1;fontSize=17;overflow=fill;', 120, 200, 
										'<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#666666;width:100%;height:100%;"><tr><td align="center" style="color:white;" width="25%">Button 1</td></tr><tr><td align="center" width="25%">Button 2</td></tr><tr><td align="center" width="25%">Button 3</td></tr><tr><td align="center" width="25%">Button 4</td></tr></table>',
										'Vertical Button Bar', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.buttons.onOffButton;' + skcl9 + 'buttonState=on;fillColor2=#008cff;fontColor=#ffffff;fontSize=17;mainText=;spacingRight=40;fontStyle=1;',
					150, 50, 'ON', 'On-off button', true));
		}));
		
		this.addPalette('mockupContainers', 'Mockup Containers', false, mxUtils.bind(this, function(content)
		{
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.containers.videoPlayer;' + skcl6 + 'strokeColor2=#008cff;strokeColor3=#c4c4c4;textColor=#666666;' + flclf + 'fillColor2=#008cff;barHeight=30;barPos=20;',
										300, 200, '', 'Video Player', false));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.containers.accordion;' + skcl6 + 'strokeColor2=#c4c4c4;textColor=#666666;textColor2=#ffffff;mainText=,,+,;textSize=17;' + flclf + 'fillColor2=#008cff;html=1;fontStyle=1;fontSize=17;overflow=fill;', 100, 220, 
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#666666;width:100%;height:100%;"><tr><td align="center" height="25">Group 1</td></tr><tr><td align="center" height="25">Group 2</td></tr><tr><td align="center" style="color:white;" height="25">Group 3</td></tr><tr><td align="center" valign="bottom">Group 4</td></tr></table>', 
					'Accordion', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.containers.browserWindow;' + skcl6 + 'strokeColor2=#008cff;strokeColor3=#c4c4c4;textColor=#666666;' + flclf + 'mainText=,;html=1;fontSize=17;fontColor=#666666;overflow=fill;', 550, 380, 
					'<table border="0" cellpadding="0" cellspacing="0" style="font-size:1em;color=#666666;width:100%;height:100%;"><tr><td width="60"/><td align="left" height="50">Page 1</td></tr><tr><td width="60"/><td width="80"/><td align="left" height="50">http://draw.io</td></tr><tr><td height="100%"></td></tr></table>',
					'Browser Window', true));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.containers.userMale;' + skcl6 + 'strokeColor2=#008cff;' + flclf,
										100, 100, '', 'User, Male', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.containers.userFemale;' + skcl6 + 'strokeColor2=#008cff;' + flclf,
										100, 100, '', 'User, Female', false));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.containers.group;' + skcl6 + flclf + 'fillColor2=#008cff;textSize=17;mainText=;textColor=#ffffff;fontSize=17;fontColor=#ffffff;align=left;verticalAlign=top;spacingLeft=8;spacingTop=-5;', 150, 200, 'Group', 'Group', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.containers.window;align=left;verticalAlign=top;spacingLeft=8;strokeColor2=#008cff;strokeColor3=#c4c4c4;fontColor=#666666;' + flclf + 'mainText=;fontSize=17;',
										550, 380, 'Window Title', 'Window', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.containers.horTabBar;' + skcl6 + 'fillColor2=#008cff;textColor=#666666;textColor2=#ffffff;' + flclf + 'tabs=,+,;textSize=17;tabStyle=block;html=1;fontSize=17;align=left;verticalAlign=top;overflow=fill;', 400, 200, 
					'<table border="0" cellpadding="0" cellspacing="2" style="font-size:1em;color:#666666;" width="217"><tr align="left"><td width="14"></td><td width="66">Tab 1</td><td width="66" style="color:#ffffff">Tab 2</td><td width="66">Tab 3</td><td align="center" width="0%"></td></tr></table>',
										'Horizontal Tab Bar', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.containers.verTabBar;' + skcl6 + 'fillColor2=#008cff;textColor=#666666;textColor2=#ffffff;' + flclf + 'tabs=,+,;textSize=17;tabStyle=block;html=1;fontSize=17;overflow=fill;align=left;', 400, 200, 
					'<table border="0" cellpadding="0" cellspacing="0" style="font-size:1em;color:#666666;"><tr><td height="10"></td></tr><tr height="25"><td width="5"></td><td>Tab 1</td></tr><tr height="35"><td width="5"></td><td style="color:#ffffff;">Tab 2</td></tr><tr height="27"><td width="5"></td><td>Tab 3</td></tr><tr><td align="center" height="0%"></td></tr></table>',
					'Vertical Tab Bar', true));
			var alertCommon = s + '=mxgraph.mockup.containers.alertBox;' + skcl6 + 'strokeColor2=#008cff;strokeColor3=#c4c4c4;textColor=#666666;' + flclf + 'mainText';
			content.appendChild(this.createVertexTemplate(alertCommon + '=Dialog Title;subText=Dialog text line 1,Dialog text line 2;buttonText=Cancel,OK;textSize=17;',
										250, 140, '', 'Dialog Box', false));
			content.appendChild(this.createVertexTemplate(alertCommon + '=Message Title;subText=Message text line 1,Message text line 2,Message text line 3;buttonText=OK;textSize=17;',
										250, 160, '', 'Message Box', false));
		}));
		
		this.addPalette('mockupForms', 'Mockup Forms', false, mxUtils.bind(this, function(content)
		{
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.forms.checkboxGroup;' + skclN + 'textColor=#666666,#008cff;mainText=;fontSize=17;fillColor=none;fontColor=#666666;spacingLeft=30;align=left',
										150, 30, 'Option 1', 'Checkbox', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.forms.checkboxGroup;' + skcl9 + 'textColor=#666666,#008cff;mainText=,,+,;fontSize=17;overflow=fill;html=1;' + flclf, 150, 120, 
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#666666;width:100%;height:100%;"><tr><td width="30"></td><td align="left">Option 1</td></tr><tr><td width="30"></td><td align="left">Option 2</td></tr><tr><td width="30"></td><td align="left" style="color:#008cff;">Option 3</td></tr><tr><td width="30"></td><td align="left">Option 4</td></tr></table>',
					'Checkbox Group', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.forms.radioGroup;' + skclN + 'textColor=#666666,#008cff;mainText=;fontSize=17;fillColor=none;spacingLeft=30;align=left;fontColor=#666666;',
										150, 30, 'Setting 1', 'Radiobutton', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.forms.radioGroup;' + skcl9 + 'textColor=#666666,#008cff;mainText=,,+,;fontSize=17;fontColor=#666666;html=1;overflow=fill;' + flclf, 150, 120, 
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#666666;width:100%;height:100%;"><tr><td width="30"></td><td align="left">Setting 1</td></tr><tr><td width="30"></td><td align="left">Setting 2</td></tr><tr><td width="30"></td><td align="left" style="color:#008cff;">Setting 3</td></tr><tr><td width="30"></td><td align="left">Setting 4</td></tr></table>',
					'Radiobutton Group', true));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.forms.colorPicker;chosenColor=#aaddff;', 40, 40, '', 'Color Picker', false));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.forms.comboBox;' + skcl9 + mxConstants.STYLE_FILLCOLOR + '=#ddeeff;align=left;fillColor2=#aaddff;mainText=;fontColor=#666666;fontSize=17;spacingLeft=3;',
										150, 30, 'Option 1', 'Combo Box', true));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.forms.spinner;' + skcl9 + 'spinLayout=right;spinStyle=normal;adjStyle=triangle;fillColor=#aaddff;textSize=17;textColor=#666666;',
										150, 60, '', 'Spinner', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.forms.menuBar;' + skcl9 + 'strokeColor2=#c4c4c4;textColor=#666666;textColor2=#ffffff;mainText=File,Edit,Options,Tools,Window,Help;textSize=17;' + flclf + 'fillColor2=#008cff',
										500, 30, '', 'Menu Bar', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.forms.horSlider;' + skcl9 + flclf + 'sliderStyle=basic;sliderPos=20;handleStyle=circle;fillColor2=#ddeeff;',
										150, 30, '', 'Horizontal Slider', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.forms.horSlider;' + skcl9 + flclf + 'sliderStyle=basic;sliderPos=20;handleStyle=circle;fillColor2=#ddeeff;direction=north;',
										30, 150, '', 'Vertical Slider', false));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.forms.listBox;' + skcl9 + 'textColor=#666666,#008cff;' + flclf + 'mainText=;subText=,,+,;textSize=17;selectedColor=#ddeeff;fontSize=17;overflow=fill;html=1;', 150, 200, 
										'<table border="0" cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;"><tr style="height:20px;"><td width="5" height="39"></td><td align="center" style="color:#008cff;">Title</td></tr><tr><td width="5"></td><td align="left" valign="top" style="padding:4px;color:#666666">Item 1<br>Item 2<br>Item 3<br>Item 4</td></tr></table>',
										'List Box', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.forms.pwField;' + skcl9 + 'mainText=;align=left;fontColor=#666666;fontSize=17;spacingLeft=3;', 150, 30, '********', 'Password Field', true));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.forms.splitter;' + skcl9, 350, 10, '', 'Horizontal Splitter', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.forms.splitter;' + skcl9 + mxConstants.STYLE_DIRECTION + '=' + mxConstants.DIRECTION_NORTH + ';', 10, 350, '', 'Vertical Splitter', false));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.forms.wedgeBar;' + skcl6 + 'fillColor2=#008cff;textColor=#666666;textColor2=#ffffff;' + flclf + 'tabs=,+,;' + 'textSize=17;tabStyle=block;html=1;fontSize=17;align=left;verticalAlign=top;overflow=fill;', 400, 30, 
										'<table border="0" cellpadding="0" cellspacing="2" style="font-size:1em;color:#666666;" width="217"><tr align="left"><td width="14"></td><td width="66">Tab 1</td><td width="66" style="color:#ffffff">Tab 2</td><td width="66">Tab 3</td><td align="center" width="0%"></td></tr></table>',
										'Wedge Bar', true));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.menus_and_buttons.font_style_selector_1;', 136, 31, '', 'Formatting Toolbar 1', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.menus_and_buttons.font_style_selector_2;', 235, 31, '', 'Formatting Toolbar 2', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.menus_and_buttons.font_style_selector_3;', 176, 38, '', 'Formatting Toolbar 3', false));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.forms.searchBox;' + skcl9 + 'mainText=;strokeColor2=#008cff;fontColor=#666666;fontSize=17;align=left;spacingLeft=3;',
										150, 30, 'Search', 'Search Box', true));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.forms.signIn;' + skcl9 + 'strokeColor2=#ddeeff;textColor=#666666;mainText=Sign In,User Name:,johndoe,Password:,********,Forgot Password?,New User,SIGN IN,SIGN UP;textColor2=#ffffff;textSize=12;textSize2=15;fillColor2=#66bbff;',
										200, 300, '', 'Sign In', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.forms.calendar;' + skcl9 + 'strokeColor2=#008cff;mainText=April 2013;textSize=12;textColor=#999999;firstDay=0;startOn=0;days=30;prevDays=31;dayNames=Mo,Tu,We,Th,Fr,Sa,Su;selDay=24;textColor2=#ffffff;',
										160, 175, '', 'Calendar', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.forms.emailForm;' + skcl9 + 'strokeColor2=#ddeeff;textColor=#666666;mainText=john@jgraph.com,Greeting,fred@jgraph.com,,,Lorem ipsum;textColor2=#ffffff;textSize=12;textSize2=15;fillColor2=#66bbff;',
					400, 300, '', 'Email', false));
		}));

		this.addPalette('mockupGraphics', 'Mockup Graphics', false, mxUtils.bind(this, function(content)
		{
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.graphics.barChart;' + flclf +  skclN + 'strokeColor2=none;strokeColor3=#666666;fillColor2=#008cff;fillColor3=#dddddd;',
										400, 200, '', 'Bar Chart', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.graphics.columnChart;' + flclf +  skclN + 'strokeColor2=none;strokeColor3=#666666;fillColor2=#008cff;fillColor3=#dddddd;',
										400, 200, '', 'Column Chart', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.graphics.lineChart;' + flclf +  skclN + 'strokeColor2=#666666;strokeColor3=#008cff;strokeColor4=#dddddd;',
										400, 200, '', 'Line Chart', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.graphics.pieChart;' +  mxConstants.STYLE_STROKECOLOR + '=#008cff;parts=10,20,35;partColors=#e0e0e0,#d0d0d0,#c0c0c0,#b0b0b0,#a0a0a0;strokeWidth=2;',
										200, 200, '', 'Pie Chart', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.graphics.iconGrid;' +  skcl9 + 'gridSize=1,1;', 50, 50, '', 'Icon Placeholder', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.graphics.iconGrid;' +  skcl9 + 'gridSize=3,3;', 200, 200, '', 'Icon Grid', false));

			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.graphics.bubbleChart;' + flclf +  skclN + 'strokeColor2=none;strokeColor3=#666666;fillColor2=#008cff;fillColor3=#dddddd;',
										400, 200, '', 'Bubble Chart', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.graphics.gauge;' + skcl9 + 'gaugePos=25;scaleColors=#bbddff,#ddeeff,#99ccff;gaugeLabels=CPU[%],0,100;needleColor=#008cff;' + flclf + 'textColor=#666666;textSize=12;',
										100, 100, '', 'Gauge', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.graphics.plotChart;' + flclf +  mxConstants.STYLE_STROKECOLOR + '=#none;strokeColor2=#aaaaaa;strokeColor3=#666666;fillColor2=#99aaff,#0022ff,#008cff;',
										400, 200, '', 'Plot Chart', false));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.graphics.ganttChart;' + flclf +  skcl9 + 'textColor=#666666;textSize=12;fillColor2=#99ccff,#dddddd;html=1;align=left;verticalAlign=top;overflow=width;',
					600, 300, 
					'<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" style="font-size:1em;">' + 
					'<tr height="16.67" align="center"><td width="3%" rowspan="2">#</td><td width="7%" rowspan="2">Task</td><td width="21.5%" rowspan="2">Start</td><td width="8.5%" rowspan="2">Effort</td><td width="35%" colspan="7">18/03/2013</td><td width="25%" colspan="7">25/03/2013</td></tr>' +
					'<tr height="16.67" align="center"><td width="5%">M</td><td width="5%">T</td><td width="5%">W</td><td width="5%">T</td><td width="5%">F</td><td width="5%">S</td><td width="5%">S</td><td width="5%">M</td><td width="5%">T</td><td width="5%">W</td><td width="5%">T</td><td width="5%">F</td></tr>' +
					'<trheight="16.67" ><td>1</td><td>Task 1</td><td>18/03/2013 8:00 AM</td><td>40h</td><td colspan="2"/><td colspan="14"/></tr>' +
					'<trheight="16.67" ><td>2</td><td>Task 2</td><td>18/03/2013 8:00 AM</td><td>16h</td><td colspan="2"/><td colspan="14"/></tr>' +
					'<trheight="16.67" ><td>3</td><td>Task 3</td><td>19/03/2013 8:00 AM</td><td>32h</td><td colspan="2"/><td colspan="14"/></tr>' +
					'<trheight="16.67" ><td>4</td><td>Task 4</td><td>18/03/2013 8:00 AM</td><td>40h</td><td colspan="2"/><td colspan="14"/></tr>' +
					'</table>', 'Gantt Chart', true));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.map;', 250, 250, '', 'Map', false));
		}));

		this.addPalette('mockupMarkup', 'Mockup Markup', false, mxUtils.bind(this, function(content)
		{
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.markup.curlyBrace;' + skcl9, 100, 20, '', 'Horizontal Curly Brace', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.markup.curlyBrace;' + skcl9 + mxConstants.STYLE_DIRECTION + '=' + mxConstants.DIRECTION_NORTH + ';', 20, 100, '', 'Vertical Curly Brace', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.markup.line;' + skcl9, 100, 20, '', 'Horizontal Line', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.markup.line;' + skcl9 + mxConstants.STYLE_DIRECTION + '=' + mxConstants.DIRECTION_NORTH + ';', 20, 100, '', 'Vertical Line', false));
			content.appendChild(this.createVertexTemplate(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.markup.scratchOut;' + skcl9 + mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=4;',
										200, 100, '', 'Scratch Out', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.markup.redX;fillColor=#ff0000;' + skclN, 200, 100, '', 'Red X', false));
		}));

		this.addPalette('mockupMisc', 'Mockup Misc', false, mxUtils.bind(this, function(content)
		{
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.help_icon;', 32, 32, '', 'Help Icon', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.playbackControls;' + skcl9 + 'fillColor2=#99ddff;strokeColor2=none;fillColor3=#ffffff;strokeColor3=none;',
										250, 30, '', 'Playback Controls', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.progressBar;fillColor=#cccccc;' + skclN + 'fillColor2=#99ddff;barPos=80;', 200, 20, '', 'Progress Bar', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.shoppingCart;' + skcl9, 50, 50, '', 'Shopping Cart', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.rating;' + skcl9 + mxConstants.STYLE_FILLCOLOR + '=#ffff00;emptyFillColor=#ffffff;grade=4;ratingScale=5;ratingStyle=star;',
										225, 30, '', 'Rating', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.mail2;' + skcl9, 100, 60, '', 'Mail', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.volumeSlider;barPos=80;fillColor=#cccccc;' + skcl9 + 'fillColor2=#ddeeff;', 250, 30, '', 'Volume Slider', false));
			
			var miscCommon = skcl9 + mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=2;';
			content.appendChild(this.createVertexTemplate(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.misc.editIcon;' + miscCommon, 50, 50, '', 'Edit Icon', false));
			content.appendChild(this.createVertexTemplate(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.misc.printIcon;' + miscCommon, 50, 50, '', 'Print Icon', false));
			content.appendChild(this.createVertexTemplate(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.misc.shareIcon;' + miscCommon, 50, 50, '', 'Share Icon', false));
			content.appendChild(this.createVertexTemplate(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.misc.trashcanIcon;' + miscCommon, 50, 50, '', 'Trashcan Icon', false));
			content.appendChild(this.createVertexTemplate(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.misc.copyrightIcon;' + miscCommon, 25, 25, '', 'Copyright', false));
			content.appendChild(this.createVertexTemplate(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.misc.registeredIcon;' + miscCommon, 25, 25, '', 'Registered', false));
			content.appendChild(this.createVertexTemplate(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.misc.volumeIcon;' + miscCommon, 25, 25, '', 'Volume', false));

			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.ruler;rulerOrient=down;unitSize=10;' + skcl9, 350, 20, '', 'Horizontal Ruler', false));

			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.ruler;rulerOrient=down;unitSize=10;' + skcl9 + mxConstants.STYLE_DIRECTION + '=' + mxConstants.DIRECTION_NORTH + ';',
										20, 350, '', 'Vertical Ruler', false));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.misc.revisionTable;strokeColor=none;fontColor=#999999;fontSize=17;mainText=,,,,,,;html=1;overflow=fill',
					400, 75, 
					'<table bordercolor="#666666" border="1" cellpadding="0" cellspacing="0" width="100%" height="100%" style="font-size:1em;">' +
					'<tr height="25" align="center"><td colspan="3" width="100%">REVISION HISTORY</td></tr>' +
					'<tr height="25" align="center"><td width="12.5%">REV</td><td width="37.5%">DATE</td><td width="50%">DESCRIPTION</td></tr>' +
					'<tr height="25" align="center"><td width="12.5%">A</td><td width="37.5%">5/17/2013</td><td width="50%">Design modified</td></tr></table>',
					'Revision Table', true));
			content.appendChild(this.createVertexTemplate(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.misc.statusBar;' + skcl9 + 'fillColor2=#ddeeff;mainText=,,;fontColor=#999999;fontSize=15;strokeColor2=#008cff;html=1;overflow=width;', 500, 30, 
					'<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" style="font-size:1em;">' +
					'<tr><td width="10"></td><td width="41%" align="left">Status text</td><td width="20%" align="left">Text 2</td><td width="24%" align="left">Text 3</td><td width="75"/></tr></table>', 
					'Status Bar', true));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.pin;fillColor2=#00dd00;fillColor3=#004400;strokeColor=#006600;',
										10, 25, '', 'Pin', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.pin;fillColor2=#dd0000;fillColor3=#440000;strokeColor=#660000;',
										10, 25, '', 'Pin', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.pin;fillColor2=#ccccff;fillColor3=#0000ff;strokeColor=#000066;',
										10, 25, '', 'Pin', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.pin;fillColor2=#ffff00;fillColor3=#888800;strokeColor=#999900;',
										10, 25, '', 'Pin', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.pin;fillColor2=#ffa500;fillColor3=#885000;strokeColor=#997000;',
										10, 25, '', 'Pin', false));
		}));

		this.addPalette('mockupNavigation', 'Mockup Navigation', false, mxUtils.bind(this, function(content)
		{
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.navigation.breadcrumb;strokeColor=#c4c4c4;textColor=#666666;textColor2=#008cff;mainText=,,,;textSize=17;strokeWidth=4;html=1;overflow=width;fontSize=17;fontColor=#666666;fontStyle=1;', 300, 30,
					'<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" style="font-size:1em;">' +
					'<tr height="100%"><td width="25%">Layer 1</td><td width="25%">Layer 2</td><td width="25%">Layer 3</td><td width="25%" style="color:#008cff">Layer 4</td></tr></table>', 
					'Breadcrumb', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.navigation.stepBar;strokeColor=#c4c4c4;textColor=#666666;textColor2=#008cff;mainText=,,+,;textSize=17;fillColor=#666666;html=1;overflow=fill;fontSize=17;fontColor=#666666;', 300, 50, 
					'<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" style="font-size:1em;">' +
					'<tr height="0%"><td width="25%">Layer 1</td><td width="25%">Layer 2</td><td width="25%" style="color:#008cff;">Layer 3</td><td width="25%">Layer 4</td></tr><tr height="100%"><td/></tr></table>', 
					'Step Bar', true));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.navigation.coverFlow;strokeColor=#999999',
										400, 200, '', 'Cover Flow', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.navigation.scrollBar;' + skcl9 + 'barPos=20;fillColor2=#99ddff;strokeColor2=none;',
										200, 20, '', 'Horizontal Scroll Bar', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.navigation.scrollBar;' + skcl9 + 'barPos=20;fillColor2=#99ddff;strokeColor2=none;direction=north;',
										20, 200, '', 'Vertical Scroll Bar', false));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.navigation.pagination;linkText=;fontSize=17;fontColor=#0000ff;html=1;fontStyle=4;',
			350, 30, '<< Prev 1 2 3 4 5 6 7 8 9 10 Next >>', 'Pagination', true));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.navigation.pageControl;fillColor=#999999;strokeColor=#ddeeff;',
										100, 30, '', 'Page Control', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.navigation.mapNavigator;fillColor2=#99ddff;strokeColor2=none;strokeColor3=#ffffff;' + skcl9,
										60, 100, '', 'Map Navigator', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.loading_circle_1;', 90, 90, '', 'Wheel Throbber 1', false));
			content.appendChild(this.createVertexTemplate(s + '=mxgraph.mockup.misc.loading_circle_2;', 90, 90, '', 'Wheel Throbber 2', false));
		}));
		
		this.addPalette('mockupText', 'Mockup Text', false, mxUtils.bind(this, function(content)
		{
			content.appendChild(this.createVertexTemplate(s2 + '=rectangle;strokeColor=none;fillColor=none;linkText=;fontSize=17;fontColor=#0000ff;fontStyle=4;html=1;', 150, 30, 'Link', 'Link', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.text.linkBar;' + skcl6 + 'strokeColor2=#c4c4c4;textColor=#0000ff;textColor2=#ffffff;mainText=+,,,;textSize=17;' + flclf + 'fillColor2=#008cff;fontSize=17;overflow=width;html=1;fontStyle=4;fontColor=#0000ff;', 500, 25, 
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;color:#0000ff;width:100%;"><tr><td align="center" style="color:white;" width="25%">Button 1</td><td align="center" width="25%">Button 2</td><td align="center" width="25%">Button 3</td><td align="center" width="25%">Button 4</td></tr></table>',
					'Link Bar', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.text.callout;linkText=;textSize=17;textColor=#666666;callDir=NW;callStyle=line;fontSize=17;fontColor=#666666;align=left;verticalAlign=top;' + skcl6,
					200, 100, 'Callout', 'Callout', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.text.callout;linkText=;textSize=17;textColor=#666666;callDir=NE;callStyle=line;fontSize=17;fontColor=#666666;align=right;verticalAlign=top;' + skcl6,
					200, 100, 'Callout', 'Callout', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.text.callout;linkText=;textSize=17;textColor=#666666;callDir=SW;callStyle=line;fontSize=17;fontColor=#666666;align=left;verticalAlign=bottom;' + skcl6,
					200, 100, 'Callout', 'Callout', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.text.callout;linkText=;textSize=17;textColor=#666666;callDir=SE;callStyle=line;fontSize=17;fontColor=#666666;align=right;verticalAlign=bottom;' + skcl6,
					200, 100, 'Callout', 'Callout', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.text.stickyNote;fontColor=#666666;mainText=;fontSize=17;whiteSpace=wrap;',
					200, 200, 'Note Line 1\nNote Line 2\nNote Line 3', 'Sticky Note', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.text.bulletedList;textColor=#666666;mainText=,,,,;textSize=17;bulletStyle=none;' + skclN + mxConstants.STYLE_FILLCOLOR + '=none;align=left;verticalAlign=top;fontSize=17;fontColor=#666666;',
										150, 135, '-Line 1\n-Line 2\n-Line 3\n-Line 4', 'Bulleted List', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.text.textBox;fontColor=#666666;align=left;fontSize=17;spacingLeft=4;spacingTop=-3;' + skcl6 + 'mainText=',
										150, 30, 'Line 1', 'Text Box', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.text.captcha;;fontColor=#666666;fontSize=25;' + skcl6 + 'mainText=',
										150, 50, 'fG2yQ23', 'Captcha', true));
			content.appendChild(this.createVertexTemplate(s2 + '=mxgraph.mockup.text.alphanumeric;linkText=;html=1;fontStyle=4;fontSize=17;fontColor=#0000ff;',
										450, 50, '0-9 A B C D E F G H I J K L M N O P Q R S T U V X Y Z', 'Alphanumeric', true));
			
			var loremText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
			content.appendChild(this.createVertexTemplate('text;spacingTop=-5;whiteSpace=wrap', 250, 470, loremText, 'Paragraph of Text', true));
			
		    var classCell = new mxCell('<table cellpadding="4" cellspacing="0" border="1" style="font-size:1em;width:100%;height:100%;"><tr><th>Header 1</th><th>Header 2</th></tr>' +
		    		'<tr><td>row 1, cell 1</td><td>row 1, cell 2</td></tr><tr><td>row 2, cell 1</td>' + 
		    		'<td>row 2, cell 2</td></tr></table> ', new mxGeometry(0, 0, 180, 80),
					'verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1');
	    	classCell.vertex = true;
	    	content.appendChild(this.createVertexTemplateFromCells([classCell], 145, 65, 'Table', true));
		}));
	};
})();
