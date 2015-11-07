import Backbone from 'backbone';
import Config from 'config';
import Job from '../models/job';

var Jobs = Backbone.Collection.extend({
  model: Job,
  url: Config.get('Client.restServer.address') + Config.get('Client.restServer.apiRoot') + Config.get('Client.restServer.jobPath'),
});

export default Jobs;
