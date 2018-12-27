import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submitCreate() {
      let manhole = this.store.createRecord('manhole', {
        name: this.name,
        location: { type: "Point", coordinates: [ this.lng, this.lat ] }
      });

     // console.log(manhole);
      manhole.save().then(transitionToDetail).catch(failure);

      let self = this;
      function transitionToDetail(manhole) {
        self.transitionToRoute('manholes.detail', manhole);
      }

      function failure(reason) {
        // handle the error
      }
    }
  }
});
