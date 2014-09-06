window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
  if (loaded) {
    console.log("Cast API available.");
    initializeCastApi();
  } else {
    console.log(errorInfo);
  }
}