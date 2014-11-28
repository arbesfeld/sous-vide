Template.Favorites.events({
  'click #favorite-item': function () {
    startCooking({
      time: this.time,
      temp: this.temperature
    });
  }
});