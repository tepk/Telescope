Meteor.publish("myOffers", function() {
    return Posts.find({userId: this.userId})
})
