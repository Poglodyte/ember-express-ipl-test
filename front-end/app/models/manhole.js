import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  location: DS.attr(), // Treat as read-only for now

  longitude: computed('location', function() {
    return this.location.coordinates[0];
  }),
  latitude: computed('location', function() {
    return this.location.coordinates[1];
  })
});
