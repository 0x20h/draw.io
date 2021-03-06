var hat, i, p, socketio, util;

socketio = require('socket.io');

util = require('util');

hat = require('hat');

p = function() {};

i = function() {};

exports.attach = function(server, model, options) {
  var authClient, io;
  io = socketio.listen(server);
  io.configure(function() {
    var option, _i, _len, _results;
    io.set('log level', 1);
    _results = [];
    for (_i = 0, _len = options.length; _i < _len; _i++) {
      option = options[_i];
      _results.push(io.set(option, options[option]));
    }
    return _results;
  });
  authClient = function(handshakeData, callback) {
    var data;
    data = {
      headers: handshakeData.headers,
      remoteAddress: handshakeData.address.address,
      secure: handshakeData.secure
    };
    return model.clientConnect(data, function(error, client) {
      if (error) {
        return callback(null, false);
      } else {
        handshakeData.client = client;
        return callback(null, true);
      }
    });
  };
  io.of('/sjs').authorization(authClient).on('connection', function(socket) {
    var client, close, closed, docState, flush, handleClose, handleOp, handleOpenCreateSnapshot, lastReceivedDoc, lastSentDoc, messageListener, open, send;
    client = socket.handshake.client;
    if (socket.request != null) {
      p("New socket connected from " + socket.request.socket.remoteAddress + " with id " + socket.id);
    }
    lastSentDoc = null;
    lastReceivedDoc = null;
    docState = {};
    closed = false;
    send = function(msg) {
      if (msg.doc === lastSentDoc) {
        delete msg.doc;
      } else {
        lastSentDoc = msg.doc;
      }
      p("Sending " + (i(msg)));
      return socket.json.send(msg);
    };
    open = function(docName, version, callback) {
      var listener;
      if (docState[docName].listener != null) callback('Doc already opened');
      p("Registering listener on " + docName + " by " + socket.id + " at " + version);
      docState[docName].listener = listener = function(opData) {
        var opMsg, _ref;
        if (docState[docName].listener !== listener) {
          throw new Error('Consistency violation - doc listener invalid');
        }
        p("listener doc:" + docName + " opdata:" + (i(opData)) + " v:" + version);
        if (((_ref = opData.meta) != null ? _ref.source : void 0) === client.id) {
          return;
        }
        opMsg = {
          doc: docName,
          op: opData.op,
          v: opData.v,
          meta: opData.meta
        };
        return send(opMsg);
      };
      return model.clientOpen(client, docName, version, listener, callback);
    };
    close = function(docName, callback) {
      var listener;
      p("Closing " + docName);
      listener = docState[docName].listener;
      if (listener == null) return callback('Doc already closed');
      model.removeListener(docName, listener);
      docState[docName].listener = null;
      return callback();
    };
    handleOpenCreateSnapshot = function(query, finished) {
      var callback, docData, docName, msg, step1Create, step2Snapshot, step3Open;
      docName = query.doc;
      msg = {
        doc: docName
      };
      callback = function(error) {
        if (error) {
          if (msg.open === true) close(docName);
          if (query.open === true) msg.open = false;
          if (query.snapshot !== void 0) msg.snapshot = null;
          delete msg.create;
          msg.error = error;
        }
        send(msg);
        return finished();
      };
      if (query.doc == null) return callback('No docName specified');
      if (query.create === true) {
        if (typeof query.type !== 'string') {
          return callback('create:true requires type specified');
        }
      }
      if (query.meta !== void 0) {
        if (!(typeof query.meta === 'object' && Array.isArray(query.meta) === false)) {
          return callback('meta must be an object');
        }
      }
      docData = void 0;
      /*
            model.clientGetSnapshot client, query.doc, (error, data) ->
              maybeCreate = (callback) ->
                if query.create and error is 'Document does not exist'
                  model.clientCreate client, docName, query.type, query.meta or {}, callback
                else
                  callback error, data
      
              maybeCreate (error, data) ->
                if query.create
                  msg.create = !!error
                if error is 'Document already exists'
                  msg.create = false
                else if error and (!msg.create or error isnt 'Document already exists')
                  # This is the real final callback, to say an error has occurred.
                  return callback error
                else if query.create or query.snapshot is null
      
      
                if query.snapshot isnt null
      */
      step1Create = function() {
        if (query.create !== true) return step2Snapshot();
        if (docData) {
          msg.create = false;
          return step2Snapshot();
        } else {
          return model.clientCreate(client, docName, query.type, query.meta || {}, function(error) {
            if (error === 'Document already exists') {
              return model.clientGetSnapshot(client, docName, function(error, data) {
                if (error) return callback(error);
                docData = data;
                msg.create = false;
                return step2Snapshot();
              });
            } else if (error) {
              return callback(error);
            } else {
              msg.create = !error;
              return step2Snapshot();
            }
          });
        }
      };
      step2Snapshot = function() {
        if (query.snapshot !== null || msg.create === true) {
          step3Open();
          return;
        }
        if (docData) {
          msg.v = docData.v;
          if (query.type !== docData.type.name) msg.type = docData.type.name;
          msg.snapshot = docData.snapshot;
        } else {
          return callback('Document does not exist');
        }
        return step3Open();
      };
      step3Open = function() {
        if (query.open !== true) return callback();
        if (query.type && docData && query.type !== docData.type.name) {
          return callback('Type mismatch');
        }
        return open(docName, query.v, function(error, version) {
          if (error) return callback(error);
          p("Opened " + docName + " at " + version + " by " + socket.id);
          msg.open = true;
          msg.v = version;
          return callback();
        });
      };
      if (query.snapshot === null || (query.open === true && query.type)) {
        return model.clientGetSnapshot(client, query.doc, function(error, data) {
          if (error && error !== 'Document does not exist') return callback(error);
          docData = data;
          return step1Create();
        });
      } else {
        return step1Create();
      }
    };
    handleClose = function(query, callback) {
      return close(query.doc, function(error) {
        if (error) {
          send({
            doc: query.doc,
            open: false,
            error: error
          });
        } else {
          send({
            doc: query.doc,
            open: false
          });
        }
        return callback();
      });
    };
    handleOp = function(query, callback) {
      var op_data;
      if (query.doc == null) throw new Error('No docName specified');
      if (query.v == null) throw new Error('No version specified');
      op_data = {
        v: query.v,
        op: query.op
      };
      op_data.meta = query.meta || {};
      op_data.meta.source = socket.id;
      return model.clientSubmitOp(client, query.doc, op_data, function(error, appliedVersion) {
        var msg;
        msg = error ? (p("Sending error to socket: " + error), {
          doc: query.doc,
          v: null,
          error: error
        }) : {
          doc: query.doc,
          v: appliedVersion
        };
        send(msg);
        return callback();
      });
    };
    flush = function(state) {
      var callback, query;
      if (state.busy || state.queue.length === 0) return;
      state.busy = true;
      query = state.queue.shift();
      callback = function() {
        state.busy = false;
        return flush(state);
      };
      p("processing query " + (i(query)));
      try {
        if (query.open === false) {
          return handleClose(query, callback);
        } else if (query.open !== void 0 || query.snapshot !== void 0 || query.create) {
          return handleOpenCreateSnapshot(query, callback);
        } else if (query.op != null) {
          return handleOp(query, callback);
        } else {
          return util.debug("Unknown message received: " + (util.inspect(query)));
        }
      } catch (error) {
        util.debug(error.stack);
        return callback();
      }
    };
    messageListener = function(query) {
      var _name;
      p("Server recieved message " + (i(query)));
      if (closed) {
        console.warn("WARNING: received query from socket after the socket disconnected.");
        console.warn(socket);
        return;
      }
      try {
        if (typeof query === 'string') query = JSON.parse(query);
        if (query.doc === null) {
          lastReceivedDoc = null;
          query.doc = hat();
        } else if (query.doc !== void 0) {
          lastReceivedDoc = query.doc;
        } else {
          if (!lastReceivedDoc) {
            throw new Error('msg.doc missing. Probably the client reconnected without telling us - this is a socket.io bug.');
          }
          query.doc = lastReceivedDoc;
        }
      } catch (error) {
        util.debug(error.stack);
        return;
      }
      docState[_name = query.doc] || (docState[_name] = {
        listener: null,
        queue: [],
        busy: false
      });
      docState[query.doc].queue.push(query);
      return flush(docState[query.doc]);
    };
    socket.on('message', messageListener);
    return socket.on('disconnect', function() {
      var docName, state;
      p("socket " + socket.id + " disconnected");
      closed = true;
      for (docName in docState) {
        state = docState[docName];
        state.busy = true;
        state.queue = [];
        if (state.listener != null) model.removeListener(docName, state.listener);
      }
      socket.removeListener('message', messageListener);
      // New code to remove document if no listeners exist
      model.clientCount--;
      p('checking listener count: ' + model.hasListeners(docName));
      if (!model.hasListeners(docName))
     	{
     		model.delete(docName);
     		p('document ' + docName + ' deleted');
    	}
      return docState = {};
    });
  });
  return server;
};
