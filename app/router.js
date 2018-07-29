import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home-page', {
    path: '/'
  });
  this.route('code', { path: '/code/:shared_id' });
});

export default Router;
