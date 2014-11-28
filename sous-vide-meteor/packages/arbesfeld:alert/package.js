Package.describe({
  name: 'arbesfeld:alert',
  summary: 'Alerts for desktop and mobile',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.addFiles('arbesfeld:alert-browser.js', 'web');
  // api.addFiles('arbesfeld:alert-cordova.js', 'web.cordova');
  api.export('Alert');
});

// Cordova.depends({
//   'org.apache.cordova.dialogs': '0.2.10'
// });