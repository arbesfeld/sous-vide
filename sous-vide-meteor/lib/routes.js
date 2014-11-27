Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'Loading'
});

Router.route('/', function () {
  this.render('Home');
}, {
  name: 'home'
});

Router.route('/settings', function () {
  this.render('Settings');
  this.render('HomeButton', { to: 'LeftHeader'} );
}, {
  name: 'settings'
});

Router.route('/favorites', function () {
  this.render('Favorites');
}, {
  name: 'favorites'
});

Router.route('/search', function () {
  this.render('Search');
}, {
  name: 'search'
});

Router.route('/signin', function () {
  this.render('SignIn');
}, {
  name: 'signin'
});

Router.onBeforeAction(function() {
  if (! Meteor.userId() ) {
    this.render('SignIn');
  } else {
    this.next();
  }
}, {except: ['home']});

Router.onBeforeAction(function () {
  if (Meteor.loggingIn()) {
    this.layout('Loading');
  } else {
    this.next();
  }
});