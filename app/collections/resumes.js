import Backbone from 'backbone';
import Config from 'config';
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
  url: Config.get('Client.restServer.address') + Config.get('Client.restServer.apiRoot') + Config.get('Client.restServer.resumePath'),
});

export default Resumes;
