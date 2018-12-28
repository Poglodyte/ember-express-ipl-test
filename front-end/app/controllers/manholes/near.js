import Controller from '@ember/controller';

export default Controller.extend({
  lng: -86.158,
  lat: 39.768,
  zoom: 17,
  circle_radius: 20,
  maxDistance: 20,

  init() {
    this._super(...arguments);
    this.selection = {
      lng: -86.158,
      lat: 39.768
    },
    this.circle_location = {
      lng: -86.158,
      lat: 39.768
    },
    this.setGeoLocation();
  },

  setGeoLocation() {
    let self = this;
    window.navigator.geolocation.getCurrentPosition((position) => {
      self.set('selection.lat', position.coords.latitude);
      self.set('selection.lng', position.coords.longitude);
      console.log('curr pos: ', position)
    });
  },

  actions: {
    submitQuery() {
     // var self = this;

      this.store.query('manhole', { nearLng: this.selection.lng, nearLat: this.selection.lat, minDistance: this.minDistance, maxDistance: this.maxDistance })
        .then((results) => {
          this.set('model', results)  // oh, wow that was simple
         // self.set('results', results);
        //  self.get('model').update();
        });
    },

    submitCreate() {
      let manhole = this.store.createRecord('manhole', {
        name: this.name,
        location: { type: "Point", coordinates: [ this.selection.lng, this.selection.lat ] }
      });

  //    let self = this;

      manhole.save()
        .then((response) => {
          // "response" might be clearer, even though "manhole" works 
          // (not sure if it's from the response, or this manhole has been updated by the response)

        //  self.transitionToRoute('manholes.detail', response);
          alert("New manhole added: ", response);
        })
        .catch((err) => {
          // TODO: handle error
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
      this.set('circle_location.lat', location.lat);
      this.set('circle_location.lng', location.lng);
    //  console.log("updating: ", location)
    //  console.log("selection: ", this.selection)
    }
  }
});
