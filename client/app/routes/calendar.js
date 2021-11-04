import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

const formatEvent = (event, bookings) => {
  const matchingBooking = bookings.find(booking => booking.event_id == event.id)
  return {
    id: event.id,
    startTime: event.start.split('T')[1].slice(0, 5),
    duration: event.duration,
    booked: matchingBooking ? true : false
  }
}

export default class CalendarRoute extends Route {
    @service
    apolloService
  
    beforeModel () {}
  
    async model (params) {
      const bookings = await this.apolloService.fetchAllBookings()
      const allEvents = await this.apolloService.fetchAllEvents()
      const eventsByDate = {};
      allEvents.forEach(event => {
          // format data for usability in template
          const formattedEvent = formatEvent(event, bookings);

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
