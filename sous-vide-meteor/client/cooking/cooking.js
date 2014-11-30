Template.Cooking.events({
  'click #start-cooking': function () {
    SousVide.stop();
  },

  'click #stop-cooking': function () {
    SousVide.stop();
    Router.go('home');
  }
});

var currentTemp = function () {
  return 50;
};

var targetTemp = function () {
  return 60;
};

Template.Cooking.helpers({
  currentTemp: function () {
    return temperatureString(currentTemp());
  },

  targetTemp: function () {
    return temperatureString(targetTemp());
  },

  tempColor: function () {
    var current = currentTemp();
    var target = targetTemp();

    if (current < target - 1) {
      return "calm";
    } else if (current > target + 1) {
      return "assertive";
    }
  }
});