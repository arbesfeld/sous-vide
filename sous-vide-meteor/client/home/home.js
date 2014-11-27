Template.Home.events({
  'click #cook': function () {
    // Get the duration and temperature.

    Session.set(IS_COOKING_KEY, true);
    SousVide.start(); // add some parameters

    Router.go('cooking');
  }
});