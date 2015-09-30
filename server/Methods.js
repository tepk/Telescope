Meteor.methods({
  daysWithPosts: function (limit) {
    var user = Meteor.users.findOne(this.userId);
    if (user.telescope.userType === UserTypes.WORKER) {
      return PostsByDayAudit.find({categories: {$in: user.telescope.categories}}, {
        limit: limit,
        sort: {day: -1}
      }).fetch();
    }
    else {
      return PostsByDayAudit.find({}, {
        limit: limit,
        sort: {day: -1}
      }).fetch();
    }
  }
})
