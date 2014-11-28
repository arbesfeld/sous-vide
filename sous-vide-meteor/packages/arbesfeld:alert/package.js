Package.describe({
  name: 'arbesfeld:alert',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('arbesfeld:alert-browser.js', 'web.browser');
  api.addFiles('arbesfeld:alert-cordova.js', 'web.cordova');
  api.export('Alert');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('arbesfeld:alert');
  api.addFiles('arbesfeld:alert-tests.js');
});
