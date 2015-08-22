Template.custom_comment_list.replaces("comment_list");

Template.comment_list.onCreated(function () {

})

Template.comment_list.onRendered(function () {
 // console.log(this);
})

Template.comment_list.helpers({
  showProposal: function () {
    // console.log(Template.parentData())
    // console.log(this)
    return Meteor.userId() === Template.parentData().userId || Meteor.userId() === this.userId || Meteor.user().isAdmin
  }
})

Template.comment_list.events({
    "submit .new_post": function (e, t) {
        return false;
    }
})
