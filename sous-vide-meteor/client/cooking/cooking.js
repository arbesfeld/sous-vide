Template.Cooking.events({
  'click #stop-cooking': function () {
    SousVide.stop();
    Router.go('home');
  },

  'click #ready': function () {
    SousVide.cook();
  }
});

var currentTemp = function () {
  return temperatureString(SousVide.currentTemp());
};

Template.Cooking.helpers({
  currentTemp: function () {
    return currentTemp();
  },

  targetTemp: function () {
    return temperatureString(SousVide.targetTemp());
  },

  donePreheating: function () {
    return SousVide.donePreheating();
  },

  preheating: function () {
    return SousVide.isPreheating();
  },

  remainingTime: function () {
    return SousVide.remainingTimeString();
  },

  tempColor: function () {
    if (SousVide.heaterOn()) {
      return "assertive";
    } else {
      return "calm";
    }
  }
});
