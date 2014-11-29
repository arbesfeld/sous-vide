var hasChanged = new ReactiveVar(false);

Session.setDefaultPersistent(IS_CELSIUS_KEY, true);

var TEMP_CELSIUS_KEY = "TEMP_CELSIUS_KEY";

Template.Settings.created = function () {
  Session.set(TEMP_CELSIUS_KEY, Session.get(IS_CELSIUS_KEY));
};

Template.Settings.rendered = function () {
  hasChanged.set(false);
};

Template.Settings.events({
  'click #save': function () {
    var uuid = $("input[name='uuid']").val();
    Session.setPersistent(UUID_KEY, uuid);
    Session.setPersistent(IS_CELSIUS_KEY, Session.get(TEMP_CELSIUS_KEY));
    hasChanged.set(false);
  },

  'keydown input': function () {
    hasChanged.set(true);
  },

  'click #c-button': function () {
    Session.set(TEMP_CELSIUS_KEY, true);
    hasChanged.set(true);
  },

  'click #f-button': function () {
    Session.set(TEMP_CELSIUS_KEY, false);
    hasChanged.set(true);
  },
});

Template.Settings.helpers({
  currentUUID: function () {
    return Session.get(UUID_KEY);
  },

  hasChanged: function () {
    return hasChanged.get();
  },

  isCelsius: function () {
    return Session.get(TEMP_CELSIUS_KEY);
  }
});