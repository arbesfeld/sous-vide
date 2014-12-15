MeteorAlert = {};

Meteor.startup(function () {
  MeteorAlert.confirm = function (msg, callback, title, buttons) {
    var cb2 = function (index) {
      if (index !== 1) {
        callback();
      }
    };
    navigator.notification.confirm(msg, cb2, title, buttons);
  };

  MeteorAlert.alert = navigator.notification.alert;
});