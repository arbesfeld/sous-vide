Template.Header.events({
  'click #sign-in': function () {
    if (Meteor.user()) {
      Router.go("profile");
    } else {
      Meteor.loginWithGoogle();
    }
  },

  'click #settings': function () {
    Router.go("settings");
  }
});

Template.Header.helpers({
  iconClasses: function () {
    return Meteor.user() ? "icon ion-person" : "";
  },

  appNameOrTitle: function () {
    return this.title || APP_NAME;
  }
});