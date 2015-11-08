import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import ShortID from 'shortid';
import Job from '../models/job';

var CreateView = Backbone.View.extend({
  model: Job,
  frontTemplate: _.template($('#front-template').html()),
  initialize: function() {
    this.currentPage = 0;
    this.minPage = 0;
    this.maxPage = 4;
    this.toggleMethods = [this.toggleFront, this.toggleJobReq, this.toggleEducationReq, this.toggleSkillLang, this.toggleSummary];
    this.navMapping = {
      'front-nav': 0,
      'job-nav': 1,
      'education-nav': 2,
      'skill-lang-nav': 3,
      'summary-nav': 4
    };
  },
  render: function() {
    this.$el.html(this.frontTemplate());
    return Promise.resolve(this);
  },
  events: {
    'click #btn-next': 'toggleNext',
    'click #btn-prev': 'togglePrev',
    'click #btn-create': 'createJob',
    'click #front-nav, #job-nav, #education-nav, #skill-lang-nav, #summary-nav': 'setActiveNav'
  },
  initializeBS: function() {
    $('#front-nav').tooltip();
    $('#job-nav').tooltip();
    $('#education-nav').tooltip();
    $('#skill-lang-nav').tooltip();
    $('#summary-nav').tooltip();
  },
  toggleFront: function(toggle) {
    if(toggle === 1) {
      $('#front-panel').fadeIn();
      $('#btn-prev').hide();
    } else if(toggle === 0) {
      $('#front-panel').hide();
      $('#btn-prev').show();
    }
  },
  toggleJobReq: function(toggle) {
    if(toggle === 1) {
      $('#job-panel').fadeIn();
    } else if(toggle === 0) {
      $('#job-panel').hide();
    }
  },
  toggleEducationReq: function(toggle) {
    if(toggle === 1) {
      $('#education-panel').fadeIn();
    } else if(toggle === 0) {
      $('#education-panel').hide();
    }
  },
  toggleSkillLang: function(toggle) {
    if(toggle === 1) {
      $('#skill-lang-panel').fadeIn();
    } else if(toggle === 0) {
      $('#skill-lang-panel').hide();
    }
  },
  toggleSummary: function(toggle) {
    if(toggle === 1) {
      $('#summary-panel').fadeIn();
      $('#btn-next').hide();
    } else if(toggle === 0) {
      $('#summary-panel').hide();
      $('#btn-next').show();
    }
  },
  setActiveNav: function(event) {
    var targetPage = this.navMapping[event.target.id];
    $('#' + event.target.id).tooltip('hide');
    $('#' + event.target.id).addClass('activeSlide');
    $('#' + _.findKey(this.navMapping, function(v){ return v == this.currentPage; }.bind(this))).removeClass('activeSlide');
    if(targetPage !== this.currentPage) {
      this.toggleMethods[this.currentPage](0);
      this.toggleMethods[targetPage](1);
      this.currentPage = targetPage;
    }
  },
  toggleNext: function() {
    $('#' + _.findKey(this.navMapping, function(v){ return v == this.currentPage+1; }.bind(this))).addClass('activeSlide');
    $('#' + _.findKey(this.navMapping, function(v){ return v == this.currentPage; }.bind(this))).removeClass('activeSlide');
    this.toggleMethods[this.currentPage](0);
    this.toggleMethods[this.currentPage+1](1);
    if(this.currentPage < this.maxPage) this.currentPage++;
  },
  togglePrev: function() {
    $('#' + _.findKey(this.navMapping, function(v){ return v == this.currentPage-1; }.bind(this))).addClass('activeSlide');
    $('#' + _.findKey(this.navMapping, function(v){ return v == this.currentPage; }.bind(this))).removeClass('activeSlide');
    this.toggleMethods[this.currentPage](0);
    this.toggleMethods[this.currentPage-1](1);
    if(this.currentPage > this.minPage) this.currentPage--;
  },
  createJob: function() {
    var jobTitle = $('#txt-title').val().trim();
    var jobIndustry = $('#txt-industry').val().trim();
    var jobExperience = $('#txt-experience').val().trim();
    var educationLevel = $('#education-level').val().trim();
    var educationField = $('#txt-education').val().trim();
    var languageSkills = $('#txt-language').val().trim();
    var workSkills = $('#txt-skill').val().trim();
    var description = $('#txt-desc').val().trim();

    var mutiplierJob = $('#metric-job').val().trim();
    var mutiplierEdu = $('#metric-education').val().trim();
    var mutiplierLang = $('#metric-language').val().trim();
    var mutiplierSkill = $('#metric-skill').val().trim();

    var newJob = new this.model({
      desiredID: ShortID.generate(),
      jobTitle: jobTitle,
      jobIndustry: jobIndustry,
      jobExperience: jobExperience,
      educationLevel: educationLevel,
      educationField: educationField,
      languageSkills: languageSkills,
      workSkills: workSkills,
      description: description,
      mutiplierJob: mutiplierJob,
      mutiplierEdu: mutiplierEdu,
      mutiplierLang: mutiplierLang,
      mutiplierSkill: mutiplierSkill
    });

    var warningTitle = 'Please ensure that you entered the following:';
    var warnings = [];
    if(_.isEmpty(jobTitle)) { warnings.push('<li>your job title</li>'); }
    if(_.isEmpty(jobIndustry)) { warnings.push('<li>your job industry</li>'); }
    if(_.isEmpty(jobExperience)) { warnings.push('<li>desired job experience</li>'); }
    else if(jobExperience >>> 0 !== parseFloat(jobExperience)) { warnings.push('<li>a valid number for job experience</li>'); }
    if(educationLevel !== 'none' && _.isEmpty(educationField)) { warnings.push('<li>desired education field</li>'); }

    if (warnings.length !== 0) {
      var formattedWarning = '<ul>';
      _.each(warnings, function(warning){
        formattedWarning += warning;
      });
      formattedWarning += '</ul>';
      var options = {
        html: true,
        title: warningTitle,
        trigger: 'manual'
      };
      $('#btn-create').popover(options);
      var popover = $('#btn-create').data('bs.popover');
      popover.options.content = formattedWarning;
      $('#btn-create').popover('show');
      setTimeout(function(){$('#btn-create').popover('hide');}, 3000);
    } else {
      newJob.save(null, {success: function(model, response) {
        Backbone.history.navigate(model.get('id'), true);
      }});
    }
  }
});

export default CreateView;
