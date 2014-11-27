Template.Profile.events({
  'click #sign-out': function () {
    Router.go('/');
    Meteor.logout();
  }
});