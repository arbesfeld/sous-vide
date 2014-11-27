var Schemas = {};

Schemas.Recipe = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 30,
        min: 1
    },
    doneness: {
        type: String,
        label: "Doneness",
        max: 30,
        min: 1
    },
    temperature: {
        type: Number,
        label: "Temperature",
        min: 10,
        max: 100
    },
    time: {
        type: Number,
        label: "Time",
        min: 10,
        max: 5000
    },
    userId: {
        type: String,
        label: "User Id",
        min: 8
    }
});

Recipes = new Mongo.Collection("recipes");
Recipes.attachSchema(Schemas.Recipe);

Recipes.allow({
    insert: function (userId, recipe) {
        return true;
    },

    update: function (userId, recipe, fields, modifier) {
        return false;
    }
});

var allowedFields = ['favorites'];
Meteor.users.allow({
  update: function (userId, user, fields, modifier) {
    if (userId !== user._id) {
      return false;
    }

    return _.every(fields, function (field) {
      return _.contains(allowedFields, field);
    });
  }
});