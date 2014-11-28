Package.describe({
  name: 'meteor-alert',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('meteor-alert-browser.js', 'web.browser');
  api.addFiles('meteor-alert-cordova.js', 'web.cordova');

  api.export('MeteorAlert');
});

Cordova.depends({
  'org.apache.cordova.dialogs': '0.2.10'
});
