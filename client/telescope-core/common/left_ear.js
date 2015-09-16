Template.left_ear.onCreated(function() {
  this.subscribe('myOffers')
})


Template.left_ear.helpers({
    openTasks: function() {
      return Posts.find({userId: Meteor.user()._id}).fetch()
    }
});

