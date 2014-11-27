Template.Header.events({
  'click #sign-in': function () {
    if (Meteor.user()) {
      Router.go("settings");
    } else {
      Meteor.loginWithGoogle();
    }
  }
});

Template.Header.helpers({
  iconClasses: function () {
    return Meteor.user() ? "icon ion-gear-a" : "";
  },

  appNameOrTitle: function () {
    return this.title || APP_NAME;
  }
});