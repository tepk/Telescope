SyncedCron.add({
  name: 'Calculate days with posts',
  schedule: function (parser) {
    // parser is a later.parse object
    return parser.text('every 1 minute');
  },
  job: function () {

    var lastAudit = PostsByDayAudit.find({}, {limit: 1, sort: {day: -1}}).fetch();
    var opt = {inactive: false}
    if (lastAudit.length === 1) {
      opt.postedAt = {$gt: new Date(lastAudit[0].day)}
    }
    var arr = Posts.find(opt).fetch();
    var hash = {};
    arr.forEach(function (item) {
        var day = new Date(item.createdAt).setHours(0, 0, 0, 0);
        if (!hash[day]) {
          hash[day] = [];
        }
        hash[day].push(item.categories);

      }
    )
    /* console.log(Object.keys(hash)); */
    Object.keys(hash).forEach(function (mass) {
        /* console.log(_.union(_.flatten(hash[mass]))); */
        PostsByDayAudit.upsert({day: Number(mass)}, {$set: {categories: _.union(_.flatten(hash[mass]))}});
      }
    )
  }
});
