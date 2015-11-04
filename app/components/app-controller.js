import Backbone from 'backbone';
import $ from 'jquery';
require('jquery-ui');
import _ from 'underscore';
import Dropzone from 'dropzone';
import Config from 'config';
import CreateView from '../views/create-view';
import JobView from '../views/job-view';


var AppController = {
    currentView: null,
    createJob: function() {
      var view = new CreateView();
      this.renderView.call(self, view);
    },

    jobDetails: function (id) {
      var self = this;
      var renderDropzone = function() {
        var resumeAddress = Config.get('Client.restServer.address') + Config.get('Client.restServer.apiRoot') + Config.get('Client.restServer.resumePath');
        var drop = new Dropzone("#resume-dropzone", {url: resumeAddress});
          drop.on('sending', function(file, xhr, formData) {
            formData.append('jobID', view.jobID);
          });
      };
      var view = new JobView({jobID: id});
      this.renderView.call(self, view).then(renderDropzone);
    },

    renderView: function(view) {
      var renderContent = function() {
        var removeView = this.currentView && this.currentView.remove();
        this.currentView = view;
        return view.render().then(function(rendered) {
          $('#main').html(rendered.el).fadeIn();
        });
      }.bind(this);

      return $('#main').fadeOut().promise().then(renderContent);
    }
};

export default AppController;
