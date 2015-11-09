import Backbone from 'backbone';
import Clipboard from 'clipboard';
import $ from 'jquery';
import _ from 'underscore';
import Job from '../models/job';
import ResumeView from '../views/resume-view';

var JobView = Backbone.View.extend({
  jobTemplate: _.template($('#job-template').html()),
  metricTemplate: _.template($('#metric-template').html()),
  initialize: function(config) {
    this.jobID = config.jobID;
    this.model = new Job({id: this.jobID});
  },
  events: {
    'click #btn-metric': 'scoreAdjustment'
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
      var capitalize = function(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      };
      var content = {
          jobTitle: self.model.get('jobTitle'),
          jobIndustry: self.model.get('jobIndustry'),
          jobExperience: self.model.get('jobExperience'),
          educationLevel: capitalize(self.model.get('educationLevel')),
          educationField: self.model.get('educationField'),
          languageSkills: self.model.get('languageSkills'),
          workSkills: self.model.get('languageSkills'),
          description: self.model.get('description')
      };

      self.multipliers = {
        multiplierJob: self.model.get('multiplierJob'),
        multiplierEdu: self.model.get('multiplierEdu'),
        multiplierLang: self.model.get('multiplierLang'),
        multiplierSkill: self.model.get('multiplierSkill'),
      };

      self.$el.html(self.jobTemplate(content));
      var view = new ResumeView({jobID: self.jobID});
      return view.render().then(function(rendered) {
        self.$el.append(rendered.el);
        self.$el.append(self.metricTemplate(self.multipliers));
        return self;
      });
    });
  },
  scoreAdjustment: function() {
    var requestedMultipliers = {
      multiplierJob: parseFloat($('#range-job').val()),
      multiplierEdu: parseFloat($('#range-edu').val()),
      multiplierLang: parseFloat($('#range-lang').val()),
      multiplierSkill: parseFloat($('#range-work').val()),
    };
    if(JSON.stringify(requestedMultipliers) !== JSON.stringify(this.multipliers)) {
      this.multipliers = requestedMultipliers;
      this.model.save(requestedMultipliers);
    }
  }
});

export default JobView;
