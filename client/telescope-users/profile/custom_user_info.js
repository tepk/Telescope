Template.user_info.helpers({

  categories: function() {
    return _.map(this.telescope.categories, function (id) {
      return Categories.findOne(id);
    })
  }/*,
  openPosts: function() {
    return Posts.find(_id: {Meteor.userId})
  }*/
})
