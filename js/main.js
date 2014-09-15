var applicationID = "6F1E40A5";
var appSession = null;

console.log("Create app module");
var learnPlayerApp = angular.module('LearnPlayerApp', []);

var LearnPlayerController = function($scope) {
  _this = this;
  // Callback called when Cast extension is available
  window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
    if (loaded) {
      console.log("Cast API available.");
      _this.initializeCastApi();
    } else {
      console.log(errorInfo);
    }
  }

  $scope.startAppSession = this.startAppSession;
  $scope.stopApp = this.stopApp;
  $scope.name = "Player" + Math.floor((Math.random() * 10) + 1);
}


/**
 * Cast extension is available, init contact.
 */
LearnPlayerController.prototype.initializeCastApi = function() {
  this.sessionRequest = new chrome.cast.SessionRequest(applicationID);
  this.apiConfig = new chrome.cast.ApiConfig(this.sessionRequest, this.sessionListener,
    this.receiverListener);
  chrome.cast.initialize(this.apiConfig, this.onInitSuccess, this.onInitError);
};

/* API Init OK */
LearnPlayerController.prototype.onInitSuccess = function() {
  console.log("Cast API intialized.");
}

LearnPlayerController.prototype.onInitError = function() {
  console.log("Cast API init error.");
}

/* Receiver events */
LearnPlayerController.prototype.receiverListener = function(e) {
  console.log("Receiver listener");
  if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
    console.log("Receiver is available");
  }
}

/* Session events */
LearnPlayerController.prototype.sessionListener = function(e) {
  console.log("Session listener");
  console.log(e);
}

/* Request app session */
LearnPlayerController.prototype.startAppSession = function() {
  console.log("Request app session")
  chrome.cast.requestSession(onRequestSessionSuccess, onRequestSessionError);
}


/* Session started */
LearnPlayerController.prototype.onRequestSessionSuccess = function(e) {
  console.log("App session request success");
  console.log(e);
  this.appSession = e;

  this.appSession.addUpdateListener(sessionUpdated);
}

/* Error when starting session */
LearnPlayerController.prototype.onRequestSessionError = function(e) {
  console.log("App session request error: ");
  console.log(e);
}


/* Session events */
LearnPlayerController.prototype.sessionUpdated = function(e) {
  console.log("Session update received");
  console.log(e);
}


/* Request session end */
LearnPlayerController.prototype.stopApp = function() {
  console.log("Stop app session.")
  appSession.stop(onStopSuccess, onStopError);
}

/* Error while requesting session end */
LearnPlayerController.prototype.onStopError = function(e) {
  console.log("App stop error");
  console.log(e);
}

/* Session ended. */
LearnPlayerController.prototype.onStopSuccess = function(e) {
  console.log("App stopped.");
}

LearnPlayerController.$inject = ['$scope'];
learnPlayerApp.controller('LearnPlayerController', LearnPlayerController);