import * as React from 'react';
import moment from 'moment';
import './index.scss';

interface IProps {
  event: any,
}

class EventPreview extends React.Component<IProps> {
  public render() {
    const event = this.props.event.fields;
    return (
      <div className="eventPreview">
        <div className="date">
          {moment(event.date).format('ll')}
        </div>
        <div className="title">
          {event.title}
        </div>
        <div className="venue">
          {event.location ? (
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${event.location.lat},${event.location.lon}`} target="_blank">
              {event.venue}
            </a>
          ) : (
            <span>{event.venue}</span>
          )}
        </div>
        <div className="price">
          {event.price}
        </div>
        <div className="description">
          {event.description}
        </div>
      </div>
    );
  }
};

export default EventPreview;
