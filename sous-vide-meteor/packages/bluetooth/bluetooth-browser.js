BluetoothPlatform = {};

BluetoothPlatform.connect = function (uuid, success) {
  Meteor.setTimeout(success, 1000);
};

BluetoothPlatform.disconnect = function () {
  //
};

BluetoothPlatform.subscribe = function () {
  //
};

BluetoothPlatform.write = function () {
  //
};

BluetoothPlatform.list = function (cb) {
  Meteor.setTimeout(function () {
    cb([{
      id: "ID",
      name: "NAME"
    }]);
  }, 1000);
};