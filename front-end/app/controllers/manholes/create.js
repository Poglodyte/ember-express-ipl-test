import Controller from '@ember/controller';

export default Controller.extend({
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
    }
  }
});
