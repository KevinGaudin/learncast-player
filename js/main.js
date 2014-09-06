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

receiverListener = function() {
  console.log("Receiver listener");
}

onInitSuccess = function() {
  console.log("Cast API intialized.");
}

onError = function() {
  console.log("Cast API int error.");
}