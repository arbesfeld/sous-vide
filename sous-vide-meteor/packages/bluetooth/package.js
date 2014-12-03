Package.describe({
  name: 'bluetooth',
  summary: 'BLE interface for Cordova and node',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  // api.versionsFrom('1.0');

  api.use('reactive-var', 'web');
  api.addFiles('bluetooth-cordova.js', 'web.cordova');
  api.addFiles('bluetooth-browser.js', 'web.browser');
  api.addFiles('bluetooth.js', 'web');
  api.export('MeteorBluetooth', 'client');
});

Cordova.depends({
  'com.megster.cordova.bluetoothserial': '0.3.3'
});