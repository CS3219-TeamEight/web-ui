import Backbone from 'backbone';
import Resume from '../models/resume';

var Resumes = Backbone.Collection.extend({
  comparator: function (a, b) {
      var score = a.get('score') - b.get('score');
      if (score === 0) {
          return a.get('score') < b.get('score') ? -1 : 1;
        }

      return score;
  },
  model: Resume,
  url: 'http://localhost:8080/api/resumes'
});

export default Resumes;
