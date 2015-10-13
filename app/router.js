import Backbone from 'backbone';
import $ from 'jquery';
import AppController from './components/app-controller';

import CreateView from './views/create-view';
import JobView from './views/job-view';

const routes = {
  '': 'createJob',
  ':jobid': 'jobDetails'
};

// Defining the application router.
class Router extends Backbone.Router {
  constructor() {
    super({ routes });
  }

  initialize() {
    var routeName;
    for (var route in this.routes) {
      routeName = this.routes[route];
      this.route(route, routeName, $.proxy(AppController[routeName], AppController));
    }
  }
}

export default Router;
