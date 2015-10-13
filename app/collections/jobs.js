import Backbone from 'backbone';
import Job from '../models/job';

var Resumes = Backbone.Collection.extend({
  model: Job,
  url: 'http://localhost:8080/api/resumes'
});

export default Jobs;
