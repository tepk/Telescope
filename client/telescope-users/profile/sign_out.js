Template.sign_out.onCreated(function () {

})
var o;
Template.sign_out.onRendered(function () {
  o = Meteor.setTimeout(function() {
    Router.go('/')
  }, 15*1000)
})

Template.sign_out.onDestroyed(function() {
  Meteor.clearTimeout(o);
})

