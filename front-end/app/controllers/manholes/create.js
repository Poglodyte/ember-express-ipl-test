import Controller from '@ember/controller';

export default Controller.extend({
  lng: -86.158, // should be strings?
  lat: 39.768,
//  zoom: 10,

  init() {
    this._super(...arguments);
    this.zoom = 10;
  },

  actions: {
    submitCreate() {
      let manhole = this.store.createRecord('manhole', {
        name: this.name,
        location: { type: "Point", coordinates: [ this.lng, this.lat ] }
      });

      let self = this;

      manhole.save()
        .then((response) => {
          // "response" might be clearer, even though "manhole" works 
          // (not sure if it's from the response, or this manhole has been updated by the response)
          self.transitionToRoute('manholes.detail', response);
        })
        .catch((err) => {
          // TODO: handle error
        });
    },

    onDragend(Event) {
      // Refresh coordinates
      this.set('lat', Event.target.position.lat());
      this.set('lng', Event.target.position.lng());
    },

    onZoomChanged(Event) {
      this.set('zoom', Event.target.zoom);
    },
  }
});
