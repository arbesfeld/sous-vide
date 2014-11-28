Template.Cooking.events({
  'click #start-cooking': function () {
    Session.set(IS_COOKING_KEY, true);
    SousVide.stop();
  },

  'click #stop-cooking': function () {
    Session.set(IS_COOKING_KEY, false);
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
  currentTemp: currentTemp,

  targetTemp: targetTemp,

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