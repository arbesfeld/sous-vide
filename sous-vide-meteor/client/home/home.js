
var MAX_TEMP = 85; // Celsius
var MIN_TEMP = 30; // Celsius

var MAX_TIME = 85; // Minutes
var MIN_TIME = 20; // Minutes

var temperature = new ReactiveVar(50);
var time = new ReactiveVar();

var setVars = function () {
  var tempVal = $('input[name=temperature]').val();
  var timeVal = $('input[name=time]').val();

  var realTemp = Math.round(tempVal/100 * (MAX_TEMP - MIN_TEMP) + MIN_TEMP);
  var realTime = timeVal/100 * (MAX_TIME - MIN_TIME) + MIN_TIME;

  temperature.set(realTemp);
  time.set(realTime);
};

Template.Home.rendered = function () {
  setVars();
};

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
    setVars();
  }
});