import React from 'react';
import { useState, useEffect } from 'react';

function EventList ({ events }) {

  const [newEvents, setNewEvents] = useState(events);
  
  useEffect(() => {
    setNewEvents(events);
  }, [events]);
  
  let groupedEvents;
  if (newEvents) {

    const filteredEvents = newEvents.filter(event =>  
      (new Date(event.start.dateTime).getTime() >= Date.now()) && (new Date(event.end.dateTime).getTime() <= new Date().setDate(new Date().getDate() + 7)) 
      ?
      event : null)

    groupedEvents = filteredEvents.reduce((groups, event) => {
      const date = new Date(event.start.dateTime).getDay();

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {}); 
  }

  return (
    <div className="eventlist-container">
      
    </div>
  );
}

export default EventList;
