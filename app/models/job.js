import Backbone from 'backbone';
import Config from 'config';

var Job = Backbone.Model.extend({
  idAttribute: 'id',
  urlRoot: Config.get('Client.restServer.address') + Config.get('Client.restServer.apiRoot') + Config.get('Client.restServer.jobPath'),
  defaults: {
    path: "",
    password: "",
    visibility: 1
  }
});

export default Job;
