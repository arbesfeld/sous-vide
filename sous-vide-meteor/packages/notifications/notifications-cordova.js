Notification = {};

// window.plugin.notification.local.add({
//     id:         String,  // A unique id of the notifiction
//     date:       Date,    // This expects a date object
//     message:    String,  // The message that is displayed
//     title:      String,  // The title of the message
//     repeat:     String,  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
//     badge:      Number,  // Displays number badge to notification
//     sound:      String,  // A sound to be played
//     json:       String,  // Data to be passed through the notification
//     autoCancel: Boolean, // Setting this flag and the notification is automatically canceled when the user clicks it
//     ongoing:    Boolean, // Prevent clearing of notification (Android only)
// }, callback, scope);

Meteor.startup(function () {
  Notification.add = window.plugin.notification.local.add;
  Notification.promptForPermission = window.plugin.notification.local.promptForPermission;
  Notification.hasPermission = window.plugin.notification.local.hasPermission;
});