Template.SignIn.events({
  'click #sign-in': function () {
    Meteor.loginWithGoogle();
  }
});