import * as React from 'react';
import EventPreview from '../EventPreview/index';
import './index.scss';

interface IProps {
  year: any,
  events: any,
}

class YearPreview extends React.Component<IProps> {
  public render() {
    const year = this.props.year.fields;
    const events = this.props.events;
    return (
      <div className="yearPreview">
        <h1 className="title">{year.title}</h1>
          <div className="events">
            { events.map((event: any, i: number) =>
              <EventPreview event={event}/>
            )}
          </div>
      </div>
    );
  }
};

export default YearPreview;
