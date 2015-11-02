import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Dropzone from 'dropzone';
import Resumes from '../collections/resumes';

var ResumeView = Backbone.View.extend({
  template: _.template($('#resume-template').html()),
  dataTemplate: _.template($('#data-template').html()),
  initialize: function(config) {
    this.collection = new Resumes();
    this.jobID = config.jobID;
    this.scoreDescending = true;
    this.limit = "";
    this.timer = setInterval(function() {
      this.collection.fetch({data: {id: this.jobID}});
    }.bind(this), 5000);
    this.listenTo(self.collection, 'add', this.render);
  },
  events: {
    'click #scoreToggle': 'toggleSort',
    'keyup #resumeCount': 'handleFilterChange'
  },
  close: function() {
    clearInterval(this.timer);
  },
  render: function() {
    var self = this;
    var computeWithTemplate = function(rendered) {
      var content = self.collection.length === 0 ? {isEmpty: true} : {isEmpty: false, dataTable: rendered};
      self.$el.html(self.template(content));
      return self;
    };
    return this.renderCollection().then(computeWithTemplate);
  },
  renderCollection: function() {
    var self = this;
    var populateTable = function () {
      if (self.collection.length === 0) return null;
      var contents = {};
      contents.resumes = self.collection.toJSON();
      contents.resumes = _.sortBy(contents.resumes, function (resume) {
        return self.scoreDescending ? -resume.score : resume.score;
      });
      contents.resumes = _.map(contents.resumes, function(resume, index) {
        resume.rank = self.scoreDescending ? index + 1 : contents.resumes.length - index;
        return resume;
      });
      return self.dataTemplate(contents);
    };

    return this.collection.fetch({data: {id: this.jobID}})
      .then(populateTable);
  },
  toggleSort: function() {
    this.scoreDescending = !this.scoreDescending;
    var arrowDirection = this.scoreDescending ? "down" : "up";
    var refreshTable = function(rendered) {
      $('#data-table').html(rendered);
      $('#sortArrow').attr("src","/app/assets/img/sort-arrow-" + arrowDirection +".png");
    }
    this.renderCollection().then(refreshTable);
  },
  handleFilterChange: function() {
    var limit = $('#resumeCount').val().trim();
    if (_.isEmpty(limit)) this.limit = 10;
    else if (_.isFinite(limit) && limit > 0) this.limit = limit;
    else {
      $('#resumeCount').popover('show');
      setTimeout(function(){$('#resumeCount').popover('hide');}, 1000);
    }
  }
});

export default ResumeView;
