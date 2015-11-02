import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Job from '../models/job';

var CreateView = Backbone.View.extend({
  model: Job,
  template: _.template($('#create-template').html()),
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  events: {
    'click #btnCreate': 'addJob'
  },
  addJob: function() {
    var title = $('#txtTitle').val().trim();
    var description = $('#txtDesc').val().trim();

    if(_.isEmpty(title)) {
      $('#txtTitle').popover('show');
      setTimeout(function(){$('#txtTitle').popover('hide');}, 1000);
    }

    if (_.isEmpty(description)) {
      $('#txtDesc').popover('show');
      setTimeout(function(){$('#txtDesc').popover('hide');}, 1000);
    }

    if(!_.isEmpty(title) && !_.isEmpty(description)) {
      var newJob = new this.model({
        description: description,
        title: title
      });

      newJob.save(null, {success: function(model, response) {
        Backbone.history.navigate(model.get('id'), true);
      }});
    }
  }
});

export default CreateView;
