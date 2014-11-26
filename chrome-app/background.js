chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'bounds': {
      'width': 400,
      'height': 500
    }
  });

  chrome.bluetooth.startDiscovery();
  chrome.bluetooth.getDevices(function (devices) {
    console.log(devices);
  });
});