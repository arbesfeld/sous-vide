
var MAX_TEMP = 85; // Celsius
var MIN_TEMP = 30; // Celsius

var MAX_TIME = 85; // Minutes
var MIN_TIME = 20; // Minutes

// map from 0 to 100 to an absolute temperature
var mapTemp = function (temp) {
  return Math.round(temp/100 * (MAX_TEMP - MIN_TEMP) + MIN_TEMP);
};

// map from 0 to 100 to an absolute time
var mapTime = function (time) {
  return Math.round(time/100 * (MAX_TIME - MIN_TIME) + MIN_TIME);
};

var temperature = new ReactiveVar(mapTemp(50));
var time = new ReactiveVar(mapTime(50));

Template.Home.helpers({
  temperature: function () {
    return temperature.get();
  },

  time: function () {
    var hours = Math.floor(time.get() / 60);
    var minutes = Math.floor(time.get() - 60 * hours);
    return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
  }
});

Template.Home.events({
  'click #cook': function () {
    // Get the duration and temperature.

    Session.set(IS_COOKING_KEY, true);
    SousVide.start(); // add some parameters

    Router.go('cooking');
  },

  'input input': function () {
    temperature.set(mapTemp($('input[name=temperature]').val()));
    time.set(mapTime($('input[name=time]').val()));
  }
});