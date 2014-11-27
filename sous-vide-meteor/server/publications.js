Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, {fields: {'favorites': 1}});
  } else {
    this.ready();
  }
});

Meteor.publish("favoriteRecipes", function () {
  var user = Meteor.users.findOne({_id: this.userId});
  var favorites = user.favorites || [];
  return Recipes.find({_id: {$in: favorites}});
});