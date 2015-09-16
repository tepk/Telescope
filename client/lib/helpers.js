Template.registerHelper('isWorker', function(user) {
  var user = typeof user === "undefined" ? Meteor.user() : user;
  if (Meteor.user().telescope.userType === UserTypes.WORKER) {
    return true;
  }
  return false;
});

Template.registerHelper('openTasks', function(id) {
  var id = Meteor.userId();
    return Posts.find({userId: Meteor.user()._id}).fetch()
});
