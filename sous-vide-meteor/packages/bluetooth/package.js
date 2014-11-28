Package.describe({
  name: 'bluetooth',
  summary: 'BLE interface for Cordova and node',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('bluetooth-cordova.js', 'web.cordova');
});

Cordova.depends({
  'com.megster.cordova.bluetoothserial': '0.3.3'
});