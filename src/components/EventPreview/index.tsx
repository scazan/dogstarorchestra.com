import * as React from 'react';
import { Link } from "react-router-dom";
import RichText from '../RichText/index';
import moment from 'moment';
import 'moment-timezone';
import './index.scss';

interface IProps {
  event: any,
}

class EventPreview extends React.Component<IProps> {
  public render() {
    const event = this.props.event.fields;
    const isPast = moment() > moment(event.date)
      .add(1, 'day')
      .startOf('day');

    return (
      <Link to={`/event/${this.props.event.fields.slug}`}>
        <div className={`eventPreview ${isPast && 'past'}`}>
          <div className="date">
            {
              // @ts-ignore
              moment(event.date).tz('America/Los_Angeles').format('lll')
            }
          </div>
          <div className="title">
              {event.title}<span className="arrow">⟶</span>
          </div>
          <div className="venue">
            {event.location ? (
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${event.location.lat},${event.location.lon}`} target="_blank" rel="noreferrer">
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
            <RichText content={event.shortDescription} />
          </div>
        </div>
      </Link>
    );
  }
};

export default EventPreview;
