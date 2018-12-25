import DS from 'ember-data';

export default DS.RESTAdapter.extend({
//  namespace: 'api', // May use, but need to set root /api/ route in express
  host: 'http://localhost:3000'
});
