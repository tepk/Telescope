Template.layout.onCreated(function () {

})

Template.layout.onRendered(function () {

})

Template.layout.helpers({
    currentRoute: function () {
        return Router.current().route.getName();
    }
})


