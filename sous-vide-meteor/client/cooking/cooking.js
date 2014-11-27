Template.Cooking.events({
  'click #stop-cooking': function () {
    Session.set(IS_COOKING_KEY, false);
    SousVide.stop();
    Router.go('home');
  }
});