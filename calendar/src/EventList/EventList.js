import './EventList.css';
import { useState, useEffect } from 'react';
import EventItem from '../EventItem/EventItem';

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
        'timeZone': 'Europe/Belgrade'
      },
      'start': {
        'dateTime': startDate,
        'timeZone': 'Europe/Belgrade'
      }
    }

    if (!(summary && startDate && endDate)) return alert('Please fill in the title, start date and end date.');

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

  const handleDeleteEvent = (eventId, calendarId) => {

    if (window.gapi) {
      const request = window.gapi.client.calendar.events.delete({
          calendarId: calendarId,
          eventId: eventId
      });

      request.execute(event => {
        console.log("Delete request: ", event)
      });

      const updatedEvents = newEvents.filter((event) => event.id !== eventId);
      setNewEvents(updatedEvents);
    }
  }

  return (
    <div className="eventlist-container">
      <div className="app-title">
        <h1>Ars Futura Calendar</h1>
      </div>

      <div className="eventlist-data-container">
        <div className="form-container">
          <form className="event-form" onSubmit={handleSubmit}>
            <h3 className="form-name-title">Create a new event</h3>
            <h4 className="form-name">TITLE</h4>
            <input className="form-input" name="title" type="text" placeholder="Event title..." value={summary} onChange={handleTitleChange} />
            <h4 className="form-name">START DATE</h4>
            <input className="form-input" name="date" type="datetime-local" step="1" placeholder="Date" value={startDate} onChange={handleStartDateChange} />
            <h4 className="form-name">END DATE</h4>
            <input className="form-input" name="date" type="datetime-local" step="1" placeholder="Date" value={endDate} onChange={handleEndDateChange} />
            <button className="form-submit" type="submit">Create</button>
          </form> 
        </div> 

        <div className="events-container">
        {groupedEvents && Object.keys(groupedEvents).map((key) => {
          return (
            <div className="grouped-events" key={key}>
            {(function() {
              switch(key) {
                case '0':
                  return <h2>Sunday</h2>;
                case '1':
                  return <h2>Monday</h2>;
                case '2':
                  return <h2>Tuesday</h2>;
                case '3':
                  return <h2>Wednesday</h2>;
                case '4':
                  return <h2>Thursday</h2>;
                case '5':
                  return <h2>Friday</h2>;
                case '6':
                  return <h2>Saturday</h2>;
                default:
                  return '';
              }
            })()}
            {groupedEvents[key].map((event) => {    
              return (
                <div className="event-item" key={event.id}>
                  <EventItem event={event} handleDeleteEvent={handleDeleteEvent} />
                </div>
              )      
            })}
            </div>
          )
        })}
        </div> 
      </div>
    </div>
  );
}

export default EventList;
