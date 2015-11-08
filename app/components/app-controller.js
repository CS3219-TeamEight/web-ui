import Backbone from 'backbone';
import $ from 'jquery';
require('jquery-ui');
import _ from 'underscore';
import CreateView from '../views/create-view';
import JobView from '../views/job-view';
import ResumeDrop from './resume-dropzone';

var AppController = {
    currentView: null,
    createJob: function() {
      var that = this;
      var view = new CreateView();
      this.renderView.call(self, view);
    },
    jobDetails: function(id) {
      var view = new JobView({jobID: id});
      this.renderView.call(self, view).then(function() { ResumeDrop.render(view); });
    },
    renderView: function(view) {
      var renderContent = function() {
        var removeView = this.currentView && this.currentView.remove();
        this.currentView = view;
        return view.render().then(function(rendered) {
          $('#main').html(rendered.el).fadeIn();
          if(typeof view.initializeBS === 'function') view.initializeBS();
        });
      }.bind(this);

      return $('#main').fadeOut().promise().then(renderContent);
    },
    renderError: function() {

    }
};

export default AppController;
