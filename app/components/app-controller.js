import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Dropzone from 'dropzone';
import CreateView from '../views/create-view';
import JobView from '../views/job-view';

var AppController = {
    currentView: null,
    createJob: function() {
      var view = new CreateView();
      this.renderView.call(self, view);
    },

    jobDetails: function (id) {
      var that = this;
      var renderDropzone = function() {
        var drop = new Dropzone("#resume-dropzone", {url: "http://localhost:8080/api/resumes"});
          drop.on('sending', function(file, xhr, formData) {
            formData.append('jobID', view.jobID)
          });

          drop.on('success', function() {
            that.renderView.call(that, view).then(renderDropzone);
          });
      };

      var view = new JobView({jobID: id});
      this.renderView.call(self, view).then(renderDropzone);
    },

    renderView: function(view) {
      var removeView = this.currentView && this.currentView.remove();
      this.currentView = view;
      var render = view.render();

      if (typeof render.then === 'function') {
        return render.then(function(rendered) {
          $('#main').html(rendered.el);
        });
      } else { $('#main').html(view.render().el); }
    }
};

export default AppController;
