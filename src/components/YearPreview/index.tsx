import * as React from 'react';
import EventPreview from '../EventPreview/index';
import RichText from '../RichText/index';
import moment from 'moment';
import './index.scss';

interface IProps {
  year: any,
  events: any,
}

interface IState {
  informationHidden: boolean,
}

class YearPreview extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      informationHidden: true,
    };

    this.toggleInformation = this.toggleInformation.bind(this);
  }

  toggleInformation() {
    this.setState({
      informationHidden: !this.state.informationHidden,
    });
  }


  public render() {
    const year = this.props.year.fields;
    const {longDescription} = year;
    const events = this.props.events;
    const hiddenClass = this.state.informationHidden ? 'hidden' : '';
    const pastClass = moment().isAfter(events.slice(-1)[0].fields.date) ? 'past' : '';
    return (
      <div className={`yearPreview ${pastClass} ${hiddenClass}`}>
        <h1
          className="title"
          onClick={this.toggleInformation}
        >
        The<br/>
          {year.title.toLowerCase().split('the ').join('')}
        </h1>
        {longDescription && (
          <div className={`information ${hiddenClass}`}>
            <RichText content={longDescription} />
          </div>
        )}
        <div className={`events ${events.length === 1 && 'short'}`}>
          { events.map((event: any, i: number) =>
            <EventPreview event={event}/>
          )}
        </div>
      </div>
    );
  }
};

export default YearPreview;
