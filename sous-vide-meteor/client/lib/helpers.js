UI.registerHelper('onPage', function (pageName) {
  return Router.current().route &&
         Router.current().route.getName() === pageName;
});

UI.registerHelper('isCooking', function (pageName) {
  return Session.get(IS_COOKING_KEY);
});

hrMinFormat = function (time) {
  var hours = Math.floor(time / 60);
  var minutes = Math.floor(time - 60 * hours);
  return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
};

UI.registerHelper('hrMinFormat', hrMinFormat);

UI.registerHelper('degreeSign', function () {
  return "&deg;C";
});

startCooking = function (opts) {
  var confirm = function () {

    // Get the duration and temperature.
    SousVide.start(); // add some parameters

    Session.set(IS_COOKING_KEY, true);

    Router.go('cooking', {
      time: opts.time,
      temp: opts.temp
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
};