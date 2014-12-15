
var MAX_TEMP = 85; // Celsius
var MIN_TEMP = 30; // Celsius

var MAX_TIME = 300; // Minutes
var MIN_TIME = 20; // Minutes

// map from 0 to 100 to an absolute temperature
var mapTemp = function (temp) {
  return Math.round(temp/100 * (MAX_TEMP - MIN_TEMP) + MIN_TEMP);
};

var invMapTemp = function (temp) {
  return (temp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP) * 100;
};

// map from 0 to 100 to an absolute time
var mapTime = function (time) {
  return Math.round(time/100 * (MAX_TIME - MIN_TIME) + MIN_TIME);
};

var invMapTime = function (time) {
  return (time - MIN_TIME) / (MAX_TIME - MIN_TIME) * 100;
};

var temperature = new ReactiveVar(mapTemp(50));
var time = new ReactiveVar(mapTime(50));

Template.Home.rendered = function () {
  $('input[name=temperature]').val(invMapTemp(temperature.get()));
  $('input[name=time]').val(invMapTime(time.get()));
};

Template.Home.helpers({
  temperature: function () {
    return temperature.get();
  },

  time: function () {
    return hrMinFormat(time.get());
  }
});

var getCookTemp = function () {
  return mapTemp($('input[name=temperature]').val());
};

var getCookTime = function () {
  return mapTime($('input[name=time]').val());
};

Template.Home.events({
  'click #cook': function () {
    startCooking({
      time: getCookTime(),
      temp: getCookTemp()
    });
  },

  'click #save': function () {
    var temp = getCookTemp();
    var time = getCookTime();

    Router.go('save-recipe', {
      temp: temp,
      time: time
    });
  },

  'input input': function () {
    temperature.set(getCookTemp());
    time.set(getCookTime());
  }
});
