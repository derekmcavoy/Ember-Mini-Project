var App = Ember.Application.create();

App.Router.map(function() {
  this.resource('threads', function() {
      this.resource('thread', { path: ':thread_id' });
    });
});

App.IndexRoute = Ember.Route.extend({
  activate: function() {
    this.transitionTo('threads');
  }
});

App.ThreadsRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON("http://www.reddit.com/r/emberjs/new/.json?limit=10").then(
      function(result) {
        console.log('got json result');
        return result.data.children.map(function(c) {
          return App.Thread.create({
            id: c.data.id,
            title:c.data.title,
            domain: c.data.domain,
            url: c.data.url,
            author: c.data.author,
            selftext_html: c.data.selftext_html,
            selftext: c.data.selftext,
            thumbnail: c.data.thumbnail
          });
        });
    }, function(erorResult) {
      console.log('got error result result');
    });
  }
});

App.ThreadRoute = Ember.Route.extend({
  model: function(params) {
    return App.Thread.fin(params.thread_id);
  }
});

//controllers
App.ThreadsController = Ember.ArrayController.extend({
  sortProperties: ['id']
});

App.ThreadController = Ember.ObjectController.extend({
  
});

//model
App.Thread = Ember.Object.extend({
  title: 'lol',
  thumbnailUrl: function() {
    var thumbnail = this.get('thumbnail');
    return ((thumbnail === 'default') || (thumbnail === 'self')) ? null: thumbnail;
  }.property('thumbnail')
});