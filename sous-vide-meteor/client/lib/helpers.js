UI.registerHelper('onPage', function (pageName) {
  return Router.current().route.getName() === pageName;
});

UI.registerHelper('isCooking', function (pageName) {
  return Session.get(IS_COOKING_KEY);
});