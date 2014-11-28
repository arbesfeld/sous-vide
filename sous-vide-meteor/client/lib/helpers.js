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
})