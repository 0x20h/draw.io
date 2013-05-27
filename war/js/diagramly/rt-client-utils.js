// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Common utility functionality for Google Drive RealTime API,
 * including authorization and file loading. This functionality should serve
 * mostly as a well-documented example, though is usable in its own right.
 */


/**
 * @namespace RealTime client utilities namespace.
 */
var rtclient = rtclient || {}


/**
 * Address of the RealTime server.
 * @const
 */
rtclient.REALTIME_SERVICE_ADDRESS = 'https://docs.google.com/otservice/'


/**
 * OAuth 2.0 scope for installing Drive Apps.
 * @const
 */
rtclient.INSTALL_SCOPE = 'https://www.googleapis.com/auth/drive.install'


/**
 * OAuth 2.0 scope for opening and creating files.
 * @const
 */
rtclient.FILE_SCOPE = 'https://www.googleapis.com/auth/drive.file'


/**
 * Parses the url parameters to this page and returns them as an object.
 * @function
 */
rtclient.getParams = function()
{
  var params = {};
  var queryString = window.location.search;
  if (queryString)
  {
    // split up the query string and store in an object
    var paramStrs = queryString.slice(1).split("&");
    for (var i = 0; i < paramStrs.length; i++)
    {
      var paramStr = paramStrs[i].split("=");
      params[paramStr[0]] = unescape(paramStr[1]);
    }
  }
  //console.log(params);
  return params;
}


/**
 * Instance of the url parameters.
 */
rtclient.params = rtclient.getParams();


/**
 * Fetches an option from options or a default value, logging an error if
 * neither is available.
 * @param options {Object} containing options.
 * @param key {string} option key.
 * @param defaultValue {Object} default option value (optional).
 */
rtclient.getOption = function(options, key, defaultValue)
{
  value = options[key] || defaultValue;
  if (!value) 
  {
    mxLog.debug(key, ' should be present in the options.');
  }
  
  mxLog.debug(value);
  return value;
}


/**
 * Creates a new Authorizer from the options.
 * @constructor
 * @param options {Object} for authorizer. Two keys are required as mandatory, these are:
 *
 *    1. "clientId", the Client ID from the API console
 *    2. "apiKey", the API key from the API console
 */
rtclient.Authorizer = function(options)
{
  this.clientId = rtclient.getOption(options, 'clientId');
  this.apiKey = rtclient.getOption(options, 'apiKey');
}


/**
 * Start the authorization process.
 * @param onAuthComplete {Function} to call once authorization has completed.
 */
rtclient.Authorizer.prototype.start = function(onAuthComplete)
{
  onAuthComplete.apply();
}


/**
 * Reauthorize the client with no callback (used for authorization failure).
 */
rtclient.Authorizer.prototype.reauthorize = function()
{
  var clientId = this.clientId;
  gapi.auth.authorize({
    client_id: clientId,
    scope: [
      rtclient.FILE_SCOPE
    ],
    immediate: true
  }, function() {});
}


/**
 * Creates a new RealTime file.
 * @param title {string} title of the newly created file.
 * @param callback {Function} the callback to call after creation.
 */
rtclient.createRealTimeFile = function(title, callback)
{
  gapi.client.load('drive', 'v2', function() {
    gapi.client.drive.files.insert({
      'resource': {
        mimeType: mxGoogleDrive.mimeType,
        title: title
      }
    }).execute(callback);
  });
}


/**
 * Fetches the metadata for a RealTime file.
 * @param fileId {string} the file to load metadata for.
 * @param callback {Function} the callback to be called on completion, with signature:
 *
 *    function onGetFileMetadata(file) {}
 *
 * where the file parameter is a Google Drive API file resource instance.
 */
rtclient.getFileMetadata = function(fileId, callback)
{
  gapi.client.load('drive', 'v2', function() {
    gapi.client.drive.files.get({
      'fileId' : id
    }).execute(callback);
  });
}


/**
 * Loads and starts listening to a RealTime file.
 * @param fileId {string} the file ID to load.
 * @param onFileLoaded {Function} the callback to call when the file is loaded.
 * @param initializeModel {Function} the callback to call when the model is first created.
 * @param reAuth {Function} the callback to call when authorization fails
 */
rtclient.loadRealTimeFile = function(fileId, onFileLoaded, initializeModel, reAuth)
{
  gapi.drive.realtime.load(fileId, onFileLoaded, initializeModel, reAuth);
}


/**
 * Parses the state parameter passed from the Drive user interface after Open
 * With operations.
 * @param stateParam {string} the state URL parameter.
 */
rtclient.parseState = function(stateParam)
{
  var stateObj = JSON.parse(stateParam);
  if (stateObj.ids.length > 0) {
     // Return only the first file ID, as multiple files can be opened from the
     // Drive UI.
    return stateObj.ids[0];
  }
}


/**
 * Redirects the browser back to the current page with an appropriae file ID.
 * @param fileId {string} the file ID to redirect to.
 */
rtclient.redirectToFile = function(fileId)
{
  // Naive url construction.
  var href = rtclient.editorUi.getUrl(window.location.pathname + '?fileId=' + fileId);
  window.location.href = href;
}


/**
 * Handles authorizing, parsing url parameters, loading and creating RealTime
 * documents.
 * @constructor
 * @param options {Object} options for loader. Four keys are required as mandatory, these are:
 *
 *    1. "clientId", the Client ID from the API console
 *    2. "apiKey", the API key from the API console
 *    3. "initializeModel", the callback to call when the file is loaded.
 *    4. "onFileLoaded", the callback to call when the model is first created.
 *
 * and one key is optional:
 *
 *    1. "defaultTitle", the title of newly created RealTime files.
 */
rtclient.RealTimeLoader = function(options)
{
  // Initialize configuration variables.
  this.onFileLoaded = rtclient.getOption(options, 'onFileLoaded');
  this.initializeModel = rtclient.getOption(options, 'initializeModel');
  this.defaultTitle = rtclient.getOption(options, 'defaultTitle',
      'new RealTime file');
  this.authorizer = new rtclient.Authorizer(options);
}


/**
 * Starts the loader by authorizing.
 */
rtclient.RealTimeLoader.prototype.start = function()
{
  // Bind to local context to make them suitable for callbacks.
  var context = this;
  var loader = this.load;
  this.authorizer.start(function()
  {
    // Apply in this instance's scope, regardless from where it is called.
    loader.apply(context);
  });
}


/**
 * Loads or creates a RealTime file depending on the fileId and state url
 * parameters.
 */
rtclient.RealTimeLoader.prototype.load = function()
{
  var fileId = rtclient.params['fileId'];
  var state = rtclient.params['state'];
  var authorizer = this.authorizer;
  
  var reAuth = function()
  {
	  authorizer.reauthorize.apply(authorizer);
  }

  // We have a file ID in the url parameters, so we will use it to load a file.
  if (fileId)
  {
    rtclient.loadRealTimeFile(fileId, this.onFileLoaded, this.initializeModel, reAuth);
  }

  // We have a state parameter being redirected from the Drive UI. We will parse
  // it and redirect to the fileId contained.
  else if (state)
  {
    fileId = rtclient.parseState(state);
    rtclient.redirectToFile(fileId);
  }

   // No fileId or state have been passed. We create a new RealTime file and
   // redirect to it.
  else
  {
    rtclient.createRealTimeFile(this.defaultTitle, function(file)
    {
      if (file.id)
      {
        rtclient.redirectToFile(file.id);
      }
      // File failed to be created, log why and do not attempt to redirect.
      else
      {
        mxLog.debug('Error creating file.');
        mxLog.debug(file);
      }
    });
  }
}