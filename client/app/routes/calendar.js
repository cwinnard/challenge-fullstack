import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default class CalendarRoute extends Route {
    @service
    apolloService
  
    beforeModel () {}
  
    async model (params) {
      const allEvents = await this.apolloService.fetchAllEvents()
      const eventsByDate = {};
      // group events by day
      allEvents.forEach(event => {
          const day = event.start.split('T')[0]
          if (Object.keys(eventsByDate).includes(day)) {
            eventsByDate[day].push(event)
          } else {
            eventsByDate[day] = [event]
          }
      })
      return eventsByDate
    }
}
