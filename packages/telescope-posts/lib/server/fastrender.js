Posts.fastRenderRoutes = [
  {
    path: "/",
    view: Settings.get('defaultView', 'top')
  },
  {
    path: "/top/:limit?",
    view: "top"
  },
  {
    path: "/new/:limit?",
    view: "new"
  },
  {
    path: "/best/:limit?",
    view: "best"
  },
  {
    path: "/pending/:limit?",
    view: "pending"
  },
  {
    path: "/scheduled/:limit?",
    view: "scheduled"
  }
];

Posts.fastRenderSubscribe = function (view, params) {
  console.log(this.userId);
  var subscriptionTerms = {
    find: {},
    view: view,
    limit: params.limit || Settings.get('postsPerPage', 10)
  };
  var user = Meteor.users.findOne(this.userId);
  if (user.telescope.userType && user.telescope.userType.length === 1 && user.telescope.userType[0] === UserTypes.WORKER) {
    subscriptionTerms.find.categories = Posts.find({categories: user.telescope.categories}).fetch()
  }
  this.subscribe('postsList', subscriptionTerms);
  this.subscribe('postsListUsers', subscriptionTerms);
};

Meteor.startup(function () {
  Posts.fastRenderRoutes.forEach(function (route) {
    FastRender.route(route.path, _.partial(Posts.fastRenderSubscribe, route.view));
  });
});
