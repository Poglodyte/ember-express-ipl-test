import Controller from '@ember/controller';

export default Controller.extend({
  lng: -86.158,
  lat: 39.768,
  zoom: 17,

  selection: {
    lat: 39.768,
    lng: -86.158
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

    updateLocation(e) {
      let location = e.target.getLatLng();
    //  this.setProperties(this.selection, {
    //    lat: location.lat,
    //    lng: location.lng
    // });
      this.set('selection.lat', location.lat);
      this.set('selection.lng', location.lng);
      console.log("updating: ", location)
      console.log("selection: ", this.selection)
    }
  }
});
