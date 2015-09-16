daysPerPage = 5;
Template.posts_daily.onCreated(function () {
  var instance = this;
  instance.daysCount = new ReactiveVar(instance.data.daysCount);
  instance.days = new ReactiveVar([]);
  instance.isMoreDaysAvailable = new ReactiveVar(true);

  this.autorun(function(){
    var instance = Template.instance();
    var daysCount = instance.daysCount.get();
    Meteor.call("daysWithPosts", daysCount, function(err, res){
      if(err){
        instance.isMoreDaysAvailable.set(false);
      } else
      if(res){
        var i = -1;
        instance.days.set(_.map(res, function(obj){
          i++;
          return {date: new Date(obj.day), index: i};
        }));
        if(res.length !== daysCount){
          instance.isMoreDaysAvailable.set(false);
        }
      }
    })

  })
});

Template.posts_daily.helpers({
  days: function () {

    return Template.instance().days.get();
  },
  isMoreDaysAvailable: function(){
    return  Template.instance().isMoreDaysAvailable.get();
  },
  context: function () {
    var instance = Template.instance();
    var daysCount = instance.daysCount.get();

    // var days = Template.parentData(1);
    var context = {
      terms: {
        view: "singleday",
        date: this.date,
        after: moment(this.date).startOf('day').toDate(),
        before: moment(this.date).endOf('day').toDate(),
        enableCache: daysCount <= 15 ? true : false // only cache first 15 days
      }
    };
    return context;
  },
  loadMoreHandler: function () {
    var instance = Template.instance();
    var daysCount = instance.daysCount.get();

    return function () {
      var newCount = daysCount + daysPerPage;
      instance.daysCount.set(newCount);
    };
  }
});
