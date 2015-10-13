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
  },
  render: function() {
    var self = this;

    return this.collection.fetch({data:{id: this.jobID}}).then(function() {
      self.listenTo(self.collection, 'add', self.render);
      if(self.collection.length === 0) {
        self.$el.html(self.template({isEmpty: true}));
      } else {
        var contents = {};
        contents.resumes = self.collection.toJSON();
        contents.isEmpty = false;
        self.$el.html(self.template(contents));
      }

      return self;
    });
  }
});

export default ResumeView;
