import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submitQuery() {
     // var self = this;

      this.store.query('manhole', { nearLng: this.lng, nearLat: this.lat, minDistance: this.minDistance, maxDistance: this.maxDistance })
        .then((results) => {
          this.set('model', results)  // oh, wow that was simple
         // self.set('results', results);
        //  self.get('model').update();
        });
    }
  }
});
