Package.describe({
  name: 'notifications',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('notifications-cordova.js', 'web.cordova');
  api.addFiles('notifications-browser.js', 'web.browser');

  api.export("Notification");
});

Cordova.depends({
  'de.appplant.cordova.plugin.local-notifications': 'https://github.com/katzer/cordova-plugin-local-notifications/tarball/4220687d618901b25e5771085b39933bc23e6c4b'
});