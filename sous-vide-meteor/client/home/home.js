
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
    return hrMinFormat(time.get());
  }
});

var getCookTemp = function () {
  return mapTemp($('input[name=temperature]').val());
};

var getCookTime = function () {
  return mapTemp($('input[name=time]').val());
};

Template.Home.events({
  'click #cook': function () {

    var confirm = function () {

      // Get the duration and temperature.
      SousVide.start(); // add some parameters

      Session.set(IS_COOKING_KEY, true);

      Router.go('cooking', {
        time: getCookTime(),
        temp: getCookTemp()
      });
    };

    if (Session.get(IS_COOKING_KEY)) {
      Alert.confirm(
        'Already cooking, are you sure you want to start a new recipe?',
        confirm,
        'Already Cooking',
        ['Continue', 'Exit']
      );
    } else {
      confirm();
    }
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