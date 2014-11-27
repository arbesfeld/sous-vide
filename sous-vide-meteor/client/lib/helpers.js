UI.registerHelper('onPage', function (pageName) {
  return Router.current().route.getName() === pageName;
});