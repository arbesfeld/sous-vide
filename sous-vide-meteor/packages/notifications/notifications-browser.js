Notification = {};

Notification.add = function (opts, cb) {
  console.log("ADDED NOTIFICATION", opts.title);
};


Notification.hasPermission = function () {
  return true;
};

Notification.promptForPermission = function () {
  console.log("Prompting for persmission");
};