import Controller from '@ember/controller';
import createBookingMutation from 'peek-client/gql/queries/createBooking.graphql'


export default Controller.extend({
    actions: {
      createBooking(event_id) {
        let variables = { event_id: parseInt(event_id), first_name: 'test', last_name: 'last' };
          
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
    },
  
    apollo: Ember.inject.service()
  });
