import * as React from 'react';
import EventPreview from '../EventPreview/index';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import moment from 'moment';
import './index.scss';

interface IProps {
  year: any,
  events: any,
}

interface IState {
  informationHidden: boolean,
}

const options = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
          const { file: {url}, title, description } = node.data.target.fields;
          return (
            <div className="image">
              <img src={url} alt={description} />
              {title && <div className="caption">{description}</div>}
            </div>
          );
        },
    },
};

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
          {year.title}
        </h1>
        {longDescription && (
          <div className={`information ${hiddenClass}`}>
            {documentToReactComponents(longDescription, options)}
          </div>
        )}
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
