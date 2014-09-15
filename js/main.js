var applicationID = "6F1E40A5";
var appSession = null;

// Callback called when Cast extension is available
window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
  if (loaded) {
    console.log("Cast API available.");
    initializeCastApi();
  } else {
    console.log(errorInfo);
  }
}

/**
 * Cast extension is available, init contact.
 */
initializeCastApi = function() {
  var sessionRequest = new chrome.cast.SessionRequest(applicationID);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener,
    receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
};

/* API Init OK */
onInitSuccess = function() {
  console.log("Cast API intialized.");
}

onInitError = function() {
  console.log("Cast API init error.");
}

/* Receiver events */
receiverListener = function(e) {
  console.log("Receiver listener");
  if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
    console.log("Receiver is available");
  }
}

/* Session events */
sessionListener = function(e) {
  console.log("Session listener");
  console.log(e);
}

/* Request app session */
startAppSession = function() {
  console.log("Request app session")
  chrome.cast.requestSession(onRequestSessionSuccess, onRequestSessionError);
}


/* Session started */
onRequestSessionSuccess = function(e) {
  console.log("App session request success");
  console.log(e);
  appSession = e;

  appSession.addUpdateListener(sessionUpdated);
}

/* Error when starting session */
onRequestSessionError = function(e) {
  console.log("App session request error: ");
  console.log(e);
}


/* Session events */
sessionUpdated = function(e) {
  console.log("Session update received");
  console.log(e);
}


/* Request session end */
stopApp = function() {
  console.log("Stop app session.")
  appSession.stop(onStopSuccess, onStopError);
}

/* Error while requesting session end */
onStopError = function(e) {
  console.log("App stop error");
  console.log(e);
}

/* Session ended. */
onStopSuccess = function(e) {
  console.log("App stopped.");
}