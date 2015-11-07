import Backbone from 'backbone';
import Config from 'config';

var Resume = Backbone.Model.extend({
  idAttribute: 'id',
  urlRoot: Config.get('Client.restServer.address') + Config.get('Client.restServer.apiRoot') + Config.get('Client.restServer.resumePath')
});

export default Resume;
