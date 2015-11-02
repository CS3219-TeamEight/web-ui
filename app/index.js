/* Load the mandatory jquery & bootstrap (non-ES6 way) */
window.jQuery = require('jquery');
require('bootstrap');

import Backbone from 'backbone';
import Router from './router';
import Dropzone from 'dropzone';


// Define your master router on the application namespace and trigger all
// navigation from this instance.
const router = new Router();

// Disable auto discovery of dropzones.
Dropzone.autoDiscover = false;

// Trigger the initial route and enable HTML5 History API support, set the root
// folder to '/' by default.
Backbone.history.start({ pushState: false, root: '/' });
