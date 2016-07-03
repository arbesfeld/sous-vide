var SessionVar = function (name, initialValue) {
  this.name = name;
  console.log(Session);
  Session.set(this.name, initialValue);
  // this.setDefaultPersistent(name, initialValue);

  this.set = function (val) {
    Session.set(this.name, val);
  },

  this.get = function () {
    return Session.get(this.name);
  }
};

SousVide = {
  _duration: new SessionVar("SV_DURATION"),
  _targetTemp: new SessionVar("SV_TARGET_TEMP"),
  _currentTemp: new SessionVar("SV_CURRENT_TEMP"),
  _startTime: new SessionVar("SV_START_TIME"),
  _remainingTime: new SessionVar("SV_REMAINING_TIME"),
  _isCooking: new SessionVar("SV_IS_COOKING", false),
  _isPreheating: new SessionVar("SV_IS_PREHEATING", false),
  _isOn: new SessionVar("SV_IS_ON", false)
};

_.extend(SousVide, {

  start: function (opts) {
    var self = this;
    console.log("Starting sous vide");
    self._isCooking.set(true);

    self._duration.set(opts.time * 60); // in seconds
    self._remainingTime.set(self.duration());
    self._targetTemp.set(opts.temp);

    self._preheat();

    // test function
    // Meteor.setInterval(function () {
    //   var current = self._currentTemp.get() || 1;
    //   self._currentTemp.set(current + 1);
    // }, 100);
  },

  _preheat: function () {
    var self = this;

    // Start preheating
    self._isPreheating.set(true);

    MeteorBluetooth.write(" 2 1 ");
    MeteorBluetooth.write(" 1 100000000 " + (self.targetTemp() + 1) + " ");
  },

  _setNotification: function () {
    var self = this;
    // Notification.add({
    //   message: "Hello",
    //   title: "Hello"
    // });
    // Notification.add({
    //   id: "DONE-COOKING",
    //   date: new Date((new Date()).getTime() + self.duration() * 1000),
    //   message: "Your scheduled recipe has finished cooking. Enjoy!",
    //   title: "Your food is ready!"
    // }, function () {
    //   console.log("Callback");
    // });
  },

  cook: function () {
    var self = this;

    self._isPreheating.set(false);
    self._startTime.set(new Date());

    self._setNotification();

    MeteorBluetooth.write(" 2 0 ");
    MeteorBluetooth.write(" 1" + " 100000000 " + self.targetTemp() + " ");
    Tracker.nonreactive(function () {
    });
  },

  stop: function () {
    console.log("Stopping sous vide");

    this._isCooking.set(false);
    this._isPreheating.set(false);
    // MeteorBluetooth.write("1 " + "0 " + "0");
  },

  duration: function () {
    return this._duration.get();
  },

  targetTemp: function () {
    return this._targetTemp.get();
  },

  currentTemp: function () {
    return this._currentTemp.get();
  },

  isCooking: function () {
    return this._isCooking.get();
  },

  isPreheating: function () {
    return this._isPreheating.get();
  },

  remainingTime: function () {
    if (this.isPreheating()) {
      return this.duration();
    }
    return this._remainingTime.get();
  },

  remainingTimeString: function () {
    var totalSec = this.remainingTime();
    var hours = parseInt( totalSec / 3600 ) % 24;
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds = Math.round(totalSec % 60);

    return (hours !== 0 ? hours + ":" : "") + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
  },

  donePreheating: function () {
    return SousVide.isPreheating() && SousVide.currentTemp() >= SousVide.targetTemp();
  },

  heaterOn: function () {
    return SousVide._isOn.get();
  }
});

Meteor.setInterval(function () {
  if (!SousVide._startTime.get()) {
    return;
  }

  var elapsedTime = (new Date() - SousVide._startTime.get()) / 1000;
  var remainingTime = Math.max(SousVide.duration() - elapsedTime, 0);

  SousVide._remainingTime.set(remainingTime);

}, 1000);

Meteor.startup(function () {
  MeteorBluetooth.subscribe('\n', function (data) {
      console.log("DATA", data);
    if (data.indexOf("ON") > -1) {
      SousVide._isOn.set(true);
    } else if(data.indexOf("OFF") > -1) {
      SousVide._isOn.set(false);
    } else if (data.indexOf("DONE") > -1) {
    } else {
      // data must be temperature
      SousVide._currentTemp.set(data);
    }
  });
});
