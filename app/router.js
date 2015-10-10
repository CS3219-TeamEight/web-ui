import Backbone from 'backbone';
import Intro from './views/pages/intro';

const routes = {
  '': 'index',
  ':jobid': 'viewJobById'
};

// Defining the application router.
class Router extends Backbone.Router {
  constructor() {
    super({ routes });
  }

  index() {
    new Intro({ el: 'main' }).render();
  }

  viewJobById(jobId) {

  }
}

export default Router;
