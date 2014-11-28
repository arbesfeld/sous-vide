Alert = {};

Alert.confirm = function (message, callback) {
  var r = confirm(message);

  if (r) {
    callback();
  }
};