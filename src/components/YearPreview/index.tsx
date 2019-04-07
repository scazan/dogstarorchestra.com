import * as React from 'react';
import EventPreview from '../EventPreview/index';
import './index.css';

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
        <div className="title">
          <h1>{year.title}</h1>

          { events.map((event: any, i: number) =>
            <EventPreview event={event}/>
          )}
        </div>
      </div>
    );
  }
};

export default YearPreview;
