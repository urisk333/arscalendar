import './EventItem.css';
import moment from 'moment';

function EventItem ({ event, handleDeleteEvent }) {

  return (
    <div className="event-container">
      <div className="event-item">
        <h4 className="event-title">TITLE</h4>
        <p className="event-info">{event.summary}</p>
        <h4 className="event-title">START</h4>
        <p className="event-info">{moment(event.start.dateTime).format('h:mm a - MMMM Do, YYYY')}</p>
        <h4 className="event-title">END</h4>
        <p className="event-info">{moment(event.end.dateTime).format('h:mm a - MMMM Do, YYYY')}</p>
        <button className="delete-button" onClick={() => handleDeleteEvent(event.id, 'primary')}>✗</button> 
      </div>
    </div>
  );
}

export default EventItem;
