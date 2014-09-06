var applicationID = "6F1E40A5";

window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
  if (loaded) {
    console.log("Cast API available.");
    initializeCastApi();
  } else {
    console.log(errorInfo);
  }
}

initializeCastApi = function() {

  var sessionRequest = new chrome.cast.SessionRequest(applicationID);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener,
    receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

sessionListener = function() {
  console.log("Session listener");
}

receiverListener = function(e) {
  console.log("Receiver listener");
  if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
    console.log("Receiver is available");
  }
}

onInitSuccess = function() {
  console.log("Cast API intialized.");
}

onError = function() {
  console.log("Cast API int error.");
}

startAppSession = function() {
  console.log("Request app session")
  chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
}

onRequestSessionSuccess = function(e) {
  console.log("App session request success");
  console.log(e);
  appSession = e;

  appSession.addUpdateListener(sessionUpdated);
}

onLaunchError = function(e) {
  console.log("App session request error: ");
  console.log(e);
}

stopApp = function() {
  console.log("Stop app session.")
  session.stop(onSuccess, onError);
}

sessionUpdated = function(e) {
  console.log("Session update received");
  console.log(e);
}