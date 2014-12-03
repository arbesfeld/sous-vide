var hasChanged = new ReactiveVar(false);

if (Session.get(IS_CELSIUS_KEY) === undefined) {
  Session.setPersistent(IS_CELSIUS_KEY, true);
}

var TEMP_CELSIUS_KEY = "TEMP_CELSIUS_KEY";
var REFRESH_ICON_KEY = "REFRESH_ICON_KEY";

var STATE_CONNECTING = "STATE_CONNECTING";
var STATE_DISCONNECTED = "STATE_DISCONNECTED";

var searchForDevices = _.throttle(function () {
  Session.set(REFRESH_ICON_KEY, true);
  MeteorBluetooth.search(function () {
    Session.set(REFRESH_ICON_KEY, false);
  }, function () {
    Session.set(REFRESH_ICON_KEY, false);
  });
}, 3000);

Template.Settings.created = function () {
  MeteorBluetooth.isConnected(null, searchForDevices);

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

  'click #refresh': searchForDevices
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
  },

  allDevices: function () {
    return MeteorBluetooth.connectedDevices();
  },

  refreshIcon: function () {
    return Session.get(REFRESH_ICON_KEY) ? "ion-looping" : "ion-loop";
  },

  isSearching: function () {
    return Session.get(REFRESH_ICON_KEY);
  }
});

Template.DeviceItem.created = function () {
  Session.set(this.data.id, STATE_DISCONNECTED);
};

Template.DeviceItem.events({
  'click a': function () {
    var self = this;

    var connect = function () {
      Session.set(self.id, STATE_CONNECTING);
      MeteorBluetooth.connect(self.id, function () {
        Session.set(self.id, STATE_DISCONNECTED);
      }, function () {
        Session.set(self.id, STATE_DISCONNECTED);
      });
    }
    if (MeteorBluetooth.isConnectedID(self.id)) {
      MeteorBluetooth.disconnect(connect);
    } else {
      connect();
    }
  }
});

Template.DeviceItem.helpers({
  isConnected: function () {
    return MeteorBluetooth.isConnectedID(this.id);
  },

  isConnecting: function () {
    return Session.get(this.id) === STATE_CONNECTING;
  }
});