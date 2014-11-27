var invalidKeys = new ReactiveVar();
var lock = new ReactiveVar(false);

Template.SaveRecipe.events({
  'click #save': function () {
    if (lock.get()) {
      return;
    }
    lock.set(true);

    var name = $("input[name='name']").val();
    var doneness = $("select[name='doneness']").val();
    var temperature = $("input[name='temperature']").val();
    var time = $("input[name='time']").val();

    var recipe = {
      name: name,
      doneness: doneness,
      temperature: temperature,
      time: time,
      userId: Meteor.userId()
    };

    Recipes.insert(recipe, function (error, result) {
      lock.set(false);
      if (error) {
        invalidKeys.set(error.invalidKeys);
      } else {
        Meteor.users.update({_id: Meteor.userId() }, {$push: {'favorites': result}});
        Router.go('favorites');
      }
    });
  }
});

Template.SaveRecipe.helpers({
  hasError: function (name) {
    return _.contains(_.pluck(invalidKeys.get(), "name"), name);
  },

  isLocked: function () {
    return lock.get();
  }
});