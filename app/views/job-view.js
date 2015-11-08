import Backbone from 'backbone';
import Clipboard from 'clipboard';
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
      var clipboard = new Clipboard('#share-url', {
          text: function(trigger) { return $(location).attr('href'); }
      });

      clipboard.on('success', function(e) {
        var options = {
          placement: 'right',
          title: 'Copied URL to Clipboard!',
          trigger: 'click focus'
        };
        $('#share-url').tooltip(options).tooltip('show');
        setTimeout(function(){
            $('#share-url').tooltip(options).tooltip('hide');
        }, 2000);
      });

      self.$el.html(self.template({jobTitle:self.model.get('jobTitle'),
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
