SyncedCron.add({
  name: 'Calculate days with posts',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 1 minute');
  },
  job: function() {
    var lastAudit = PostsByDayAudit.find({}, {limit: 1, sort: {day: -1}}).fetch();
    var opt = {inactive: false}
    if(lastAudit.length === 1){
      opt.postedAt = {$gt: lastAudit[0].day}
    }
    Posts.find(opt).forEach(function(post){

      var day = new Date(post.createdAt).setHours(0,0,0,0);
      PostsByDayAudit.upsert({day: day}, {$set: {hasPosts: true}});
    })
  }
});
