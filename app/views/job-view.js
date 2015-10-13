import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Job from '../models/job';
import ResumeView from '../views/resume-view';

var JobView = Backbone.View.extend({
  template: _.template($('#job-template').html()),
  initialize: function(config) {
    this.jobID = config.jobID;
    this.model = new Job({id: this.jobID});
  },
  render: function() {
    var self = this;
    return this.model.fetch().then(function() {
      self.$el.html(self.template({jobTitle:self.model.get('title'),
      jobDescription:self.model.get('description')}));
      var view = new ResumeView({jobID: self.jobID});
      return view.render().then(function(rendered) {
        self.$el.append(rendered.el);
        return self;
      });
    });
  }
});

export default JobView;
