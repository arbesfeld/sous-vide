SousVide = {};

_.extend(SousVide, {

  start: function () {
    Session.set(IS_COOKING_KEY, true);
    console.log("Starting sous vide");
  },

  stop: function () {
    Session.set(IS_COOKING_KEY, false);
    console.log("Stopping sous vide");
  }

});