import React from 'react';
import { useState, useEffect } from 'react';

function EventList ({ events }) {

  const [newEvents, setNewEvents] = useState(events);
  const [summary, setSummary] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
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

  function handleTitleChange (e) {
    setSummary(e.target.value);
  }

  function handleStartDateChange (e) {
    setStartDate(e.target.value);
  }

  function handleEndDateChange (e) {
    setEndDate(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    
    const event = { 
      'summary': summary,
      'end': {
        'dateTime': endDate,
        'timeZone': 'UTC'
      },
      'start': {
        'dateTime': startDate,
        'timeZone': 'UTC'
      }
    }

    if (!(summary && startDate && endDate)) return alert('Please fill in the title, date and venue fields.');

    window.gapi.auth2.getAuthInstance().signIn()
      .then(() => {    
        if (window.gapi) {
          const request = window.gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event
          });

          request.execute(event => {
            setNewEvents([...newEvents, event]
              .sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime()));
          });
        }
        setSummary('');
        setStartDate('');
        setEndDate('');
      });
  }

  return (
    <div className="eventlist-container">
      <div className="form-container">
        <form className="event-form" onSubmit={handleSubmit}>
          <h2 className="form-name-title">Create a new event</h2>
          <h4 className="form-name">TITLE</h4>
          <input className="form-input" name="title" type="text" placeholder="Event title..." value={summary} onChange={handleTitleChange} />
          <h4 className="form-name">START DATE</h4>
          <input className="form-input" name="date" type="datetime-local" step="1" placeholder="Date" value={startDate} onChange={handleStartDateChange} />
          <h4 className="form-name">END DATE</h4>
          <input className="form-input" name="date" type="datetime-local" step="1" placeholder="Date" value={endDate} onChange={handleEndDateChange} />
          <button className="form-submit" type="submit">Create</button>
        </form> 
      </div>  
    </div>
  );
}

export default EventList;
