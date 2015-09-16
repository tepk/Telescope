Router.onBeforeAction(function() {
  if (Meteor.user() && !Meteor.user().telescope.userType) {

    Router.go('user_edit', {slug: Meteor.user().telescope.slug})
    console.log('Пожалуйста, дозаполните ваш профиль')
    this.next()
  }
  else {
    console.log('Похоже, все в порядке')
    this.next()
  }
})
