import * as React from 'react';
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
          {event.date}
        </div>
        <div className="title">
          {event.title}
        </div>
        <div>
          {event.price}
        </div>
        <div>
          {event.venue}
        </div>
        <div>
          {event.description}
        </div>
      </div>
    );
  }
};

export default EventPreview;
