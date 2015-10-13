import Backbone from 'backbone';

var Resume = Backbone.Model.extend({
  idAttribute: 'id',
  urlRoot: "http://localhost:8080/api/resumes"
});

export default Resume;
