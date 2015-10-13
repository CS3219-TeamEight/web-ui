import Backbone from 'backbone';
import Resume from '../models/resume';

var Resumes = Backbone.Collection.extend({
  model: Resume,
  url: 'http://localhost:8080/api/resumes'
});

export default Resumes;
