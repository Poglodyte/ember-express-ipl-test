import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  lng: -86.158, // should be strings? It just doesn't like 0 unless it's a string?
  lat: 39.768,
  zoom: 17, // 20 seems to be max for Satellite (Indianapolis) and 22 is max for Map

  minDistance: 0,
  maxDistance: 100,

  init() {
    this._super(...arguments);
    this.circle = {
      lng: this.lng,
      lat: this.lat,
      inner: this.minDistance,
      outer: this.maxDistance
    };
  },

  // was trying to make circle.inner a computed property to convert maxDistance form string to numerical value
  /*
  let object = {};
Ember.defineProperty(object, 'key', Ember.computed(() => 'value'));
Ember.get(object, 'key') === 'value';
*/

  actions: {
    submitQuery() {
     // var self = this;

      this.store.query('manhole', { nearLng: this.circle.lng, nearLat: this.circle.lat, minDistance: this.minDistance, maxDistance: this.maxDistance })
        .then((results) => {
          this.set('model', results)  // oh, wow that was simple
         // self.set('results', results);
        //  self.get('model').update();
        });
    },

    onDragend(Event) {
      // Refresh coordinates
      this.set('circle.lat', Event.target.center.lat());
      this.set('circle.lng', Event.target.center.lng());
    },

    updateRadius() {
      this.set('circle.outer', Number(this.maxDistance));
    }
  }
});
