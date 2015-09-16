Meteor.methods({
  daysWithPosts: function(limit){
    return PostsByDayAudit.find({}, {limit: limit, sort: {day: -1}}).fetch();
  }
})
