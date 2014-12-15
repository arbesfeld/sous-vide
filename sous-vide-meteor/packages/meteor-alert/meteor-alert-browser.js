MeteorAlert = {};

MeteorAlert.confirm = function (message, callback) {
  var r = confirm(message);

  if (r) {
    callback();
  }
};

MeteorAlert.alert = alert;