import Controller from '@ember/controller';

export default Controller.extend({
  lng: -86.158,
  lat: 39.768,
  zoom: 17, // 20 seems to be max for Satellite (Indianapolis) and 22 is max for Map

  init() {
    this._super(...arguments);
    this.marker = {
      lng: -86.158,
      lat: 39.768
    }
  },

  actions: {
    submitQuery() {
     // var self = this;

      this.store.query('manhole', { nearLng: this.lng, nearLat: this.lat, minDistance: this.minDistance, maxDistance: this.maxDistance })
        .then((results) => {
          this.set('model', results)  // oh, wow that was simple
         // self.set('results', results);
        //  self.get('model').update();
        });
    },

    onDragend(Event) {
      // Refresh coordinates
      this.set('marker.lat', Event.target.position.lat());
      this.set('marker.lng', Event.target.position.lng())
    }
  }
});
