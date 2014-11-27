Template.Settings.events({
  'click #sign-out': function () {
    Router.go('/');
    Meteor.logout();
  }
});