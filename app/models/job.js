import Backbone from 'backbone';

var Job = Backbone.Model.extend({
  idAttribute: 'id',
  urlRoot: "http://localhost:8080/api/jobs",
  defaults: {
    path: "",
    password: "",
    visibility: 1
  }
});

export default Job;
