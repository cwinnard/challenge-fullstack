import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

const formatEvent = (event) => {
  return {
    startTime: event.start.split('T')[1],
    duration: event.duration,
    booked: false
  }
}

export default class CalendarRoute extends Route {
    @service
    apolloService
  
    beforeModel () {}
  
    async model (params) {
      const allEvents = await this.apolloService.fetchAllEvents()
      const eventsByDate = {};
      allEvents.forEach(event => {
          // format data for usability in template
          const formattedEvent = formatEvent(event);

          // group events by day
          const day = event.start.split('T')[0]
          if (Object.keys(eventsByDate).includes(day)) {
            eventsByDate[day].push(formattedEvent)
          } else {
            eventsByDate[day] = [formattedEvent]
          }
      })
      return eventsByDate
    }
}
