MeteorBluetooth = {};

Meteor.startup(function () {

  var connectedId = new ReactiveVar(false);
  var connectedDevices = new ReactiveVar([]);

  MeteorBluetooth.search = function (success, failure) {
    BluetoothPlatform.list(function (devices) {
      connectedDevices.set(devices);
      success && success();
    }, function () {
      console.log("Failed to find devices");
      failure && failure();
    });
  };

  MeteorBluetooth.connectedDevices = function () {
    return connectedDevices.get();
  };

  MeteorBluetooth.isConnected = function () {
    return connectedId.get() !== "";
  };

  MeteorBluetooth.isConnectedID = function (id) {
    return connectedId.get() === id;
  };

  MeteorBluetooth.connect = function (uuid, success, failure) {
    connectedId.set("");
    BluetoothPlatform.connect(uuid, function () {
      connectedId.set(uuid);
      success && success();
    }, function () {
      failure && failure();
    });
  };

  MeteorBluetooth.disconnect = function (success, failure) {
    BluetoothPlatform.disconnect(function () {
      connectedId.set("");
      success && success();
    }, failure);
  };

  MeteorBluetooth.subscribe = BluetoothPlatform.subscribe;
  MeteorBluetooth.isConnected = BluetoothPlatform.isConnected;
  MeteorBluetooth.write = BluetoothPlatform.write;
});

