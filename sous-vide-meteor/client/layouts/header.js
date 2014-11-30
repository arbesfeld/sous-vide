Template.Header.events({
  'click #profile': function () {
    if (Meteor.user()) {
      Router.go("profile");
    } else {
      Meteor.loginWithGoogle({
      }, function (err) {
        if (err) {
          //error handling
          alert('error : '+err.message);
        } else {

        }
      });
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