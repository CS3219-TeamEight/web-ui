import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Config from 'config';
import Spinner from 'spin.js';
import Resumes from '../collections/resumes';
import ResumeDrop from '../components/resume-dropzone';

var ResumeView = Backbone.View.extend({
  template: _.template($('#resume-template').html()),
  dataTemplate: _.template($('#data-template').html()),
  initialize: function(config) {
    this.collection = new Resumes();
    this.jobID = config.jobID;
    this.scoreDescending = true;
    this.limit = 10;
    this.timer = setInterval(function() {
      this.collection.fetch({data: {id: this.jobID}});
    }.bind(this), 5000);
    this.listenTo(this.collection, 'add', this.refreshTable);
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
      contents.resumes = self.collection.first(parseInt(self.limit));
      contents.resumes = _.map(contents.resumes, function(resume, index) {
        resume = resume.toJSON();
        resume.fileName = resume.resumePath.split("/").pop();
        resume.download = Config.get('Client.restServer.address') + Config.get('Client.restServer.apiRoot') + Config.get('Client.restServer.resumePath') + '/' + resume.id;
        resume.rank = self.scoreDescending ? index + 1 : contents.resumes.length - index;
        return resume;
      });

      contents.resumes = _.sortBy(contents.resumes, function (resume) {
        return self.scoreDescending ? -resume.score : resume.score;
      });

      return self.dataTemplate(contents);
    };

    return this.collection.fetch({data: {id: this.jobID}})
      .then(populateTable);
  },
  renderTable: function(rendered) {
    if ($('#data-table').length) return Promise.resolve($('#data-table').html(rendered));
    else this.render().then(function() { ResumeDrop.render(this); }.bind(this));
  },
  refreshTable: function() {
    return this.renderCollection().then(this.renderTable.bind(this));
  },
  toggleSort: function() {
    this.scoreDescending = !this.scoreDescending;
    var arrowDirection = this.scoreDescending ? 'down' : 'up';
    var oppositeDirection = this.scoreDescending ? 'up' : 'down';
    var refreshArrow = function(rendered) {
      var currentArrow = $('#sortArrow').attr('src');
      currentArrow = currentArrow.replace(new RegExp(oppositeDirection, 'g'), arrowDirection);
      $('#sortArrow').attr("src", currentArrow);
    };
    this.renderCollection().then(this.renderTable).then(refreshArrow);
  },
  handleFilterChange: function() {
    var limit = $('#resumeCount').val().trim();
    if (_.isEmpty(limit)) this.limit = 10;
    else if (_.isFinite(limit) && limit > 0){
      this.limit = limit;
      return this.refreshTable();
    } else {
      $('#resumeCount').popover('show');
      setTimeout(function(){$('#resumeCount').popover('hide');}, 1000);
    }
  }
});

export default ResumeView;
