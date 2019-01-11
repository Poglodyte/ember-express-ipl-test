import DS from 'ember-data';

export default DS.RESTAdapter.extend({
//  namespace: 'api', // May use, but need to set root /api/ route in express
  host: 'https://ipl-manholes.cfapps.io/'
});
