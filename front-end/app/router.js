import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('manholes', function() {
    this.route('detail', { path: '/:manhole_id' });
  });
});

export default Router;
