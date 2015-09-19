Template.sign_out.onCreated(function () {

})

Template.sign_out.onRendered(function () {
  Meteor.setTimeout(function() {
    Router.go('/')
  }, 15*1000)
})


