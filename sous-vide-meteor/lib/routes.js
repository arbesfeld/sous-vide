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
}, {
  name: 'settings'
});

Router.route('/profile', function () {
  this.render('Profile');
}, {
  name: 'profile'
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

Router.route('/cooking', function () {
  this.layout('Cooking');
}, {
  name: 'cooking'
});

Router.onBeforeAction(function() {
  if (! Meteor.userId() ) {
    this.render('SignIn');
  }
  this.next();
}, {except: ['home']});

Router.onBeforeAction(function () {
  if (Meteor.loggingIn()) {
    this.layout('Loading');
  }
  this.next();
});