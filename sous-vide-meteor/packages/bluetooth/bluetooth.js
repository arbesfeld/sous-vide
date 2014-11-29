Bluetooth = {};

var bluetoothConnected = new ReactiveVar(false);

Bluetooth.isConnected = function () {
  return bluetoothConnected.get();
};

Bluetooth.connect = function (uuid, success, failure) {
  BluetoothPlatform.connect(uuid, function () {
    bluetoothConnected.set(true);
    success && success();
  }, function () {
    bluetoothConnected.set(false);
    failure && failure();
  });
};

Bluetooth.disconnect = function (success, failure) {
  BluetoothPlatform.disconnect(function () {
    bluetoothConnected.set(false);
    success && success();
  }, failure);
};

Bluetooth.subscribe = BluetoothPlatform.subscribe;
Bluetooth.write = BluetoothPlatform.write;

