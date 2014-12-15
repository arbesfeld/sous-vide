UI.registerHelper('onPage', function (pageName) {
  return Router.current().route &&
         Router.current().route.getName() === pageName;
});

UI.registerHelper('isCooking', function (pageName) {
  return SousVide.isCooking();
});

hrMinFormat = function (time) {
  var hours = Math.floor(time / 60);
  var minutes = Math.floor(time - 60 * hours);
  return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
};

UI.registerHelper('hrMinFormat', hrMinFormat);

startCooking = function (opts) {
  // if (! MeteorBluetooth.isConnected()) {
  //   MeteorAlert.alert("Bluetooth not connected. Go to settings to connect a Bluetooth device.");
  //   return;
  // }

  var confirm = function () {
    // Get the duration and temperature.
    SousVide.start(opts); // add some parameters

    Router.go('cooking', {
      time: opts.time,
      temp: opts.temp
    });
  };

  if (SousVide.isCooking()) {
    MeteorAlert.confirm(
      'Already cooking, are you sure you want to start a new recipe?',
      confirm,
      'Already Cooking',
      ['Cancel', 'OK']
    );
  } else {
    confirm();
  }
};

isCelsius = function () {
  return Session.equals(IS_CELSIUS_KEY, true);
};

UI.registerHelper('isCelsius', isCelsius);

temperatureSign = function () {
  return "&deg;" + (isCelsius() ? 'C': 'F');
};

UI.registerHelper('temperatureSign', temperatureSign);

temperatureString = function (temp) {
  if (! isCelsius()) {
    temp = Math.floor(temp * 1.8 + 32);
  }

  return temp + temperatureSign();
};

UI.registerHelper('temperatureString', temperatureString);