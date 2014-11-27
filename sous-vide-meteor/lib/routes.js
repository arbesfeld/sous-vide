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
  name: 'favorites',

  waitOn: function () {
    return [Meteor.subscribe("userData"), Meteor.subscribe("favoriteRecipes")];
  },
  data: function () {
    return {
      favoriteRecipes: Recipes.find()
    };
  }
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


Router.route('/save-recipe/:temp/:time', function () {
  var self = this;
  this.render('SaveRecipe', {
    data: function () {
      return {
        temp: self.params.temp,
        time: self.params.time
      };
    }
  });
}, {
  name: 'save-recipe'
});

Router.onBeforeAction(function() {
  if (! Meteor.userId() ) {
    this.render('SignIn');
  } else {
    this.next();
  }
}, {except: ['home', 'cooking']});

Router.onBeforeAction(function () {
  if (Meteor.loggingIn()) {
    this.layout('Loading');
  } else {
    this.next();

  }
});