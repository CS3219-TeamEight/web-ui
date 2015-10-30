import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Dropzone from 'dropzone';
import Resumes from '../collections/resumes';

var ResumeView = Backbone.View.extend({

  template: _.template($('#resume-template').html()),
  initialize: function(config) {
    this.collection = new Resumes();
    this.jobID = config.jobID;
    this.timer = setInterval(function() {
      this.collection.fetch({data: {id: this.jobID}});
    }.bind(this), 5000);
    this.listenTo(self.collection, 'add', this.render);
  },
  close: function() {
    clearInterval(this.timer);
  },
  render: function() {
    var self = this;
    var renderCollection = function () {
      if (self.collection.length === 0) {
        self.$el.html(self.template());
      } else {
        var contents = {};
        contents.resumes = self.collection.toJSON();
        contents.isEmpty = false;
        self.$el.html(self.template(contents));
      }
      return self;
    };
    return this.collection.fetch({data: {id: this.jobID}})
      .then(renderCollection);
  }
});

export default ResumeView;
