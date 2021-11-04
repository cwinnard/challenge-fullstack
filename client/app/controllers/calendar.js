import Controller from '@ember/controller';
import createBookingMutation from 'peek-client/gql/queries/createBooking.graphql'


export default Controller.extend({
    first_name: undefined,
    last_name: undefined,
    actions: {
      createBooking(event_id) {
        const first_name = this.get('first_name');
        const last_name = this.get('last_name');
        if (!first_name || !last_name) {
          alert('Please enter your name to book!')
        } else {
          let variables = { event_id: parseInt(event_id), first_name, last_name };
          
          return this.get('apollo')
            .mutate(
              {
                mutation: createBookingMutation,
                variables
              },
              'createBooking'
            )
            .then(() => {})
            .catch(error => console.log('error encountered, booking saved'))
            .finally(() => { window.location.reload(true); });
        }
      }
    },
  
    apollo: Ember.inject.service()
  });
