import * as React from 'react';
import moment from 'moment';
import RichText from '../../components/RichText/index';
import { Link } from "react-router-dom";
import { getEventsBySlug } from '../../util/store';
import './index.scss';

interface IProps {
  match: {
    params: {
      slug: string,
    }
  }
}
interface IState {
  entry: any,
}

const EventPage = class EventPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      entry: {
        fields: {
          title: '',
          description: null,
          longDescription: null,
        },
      },
    };

  }

  public render() {
    const {
      title,
      shortDescription,
      longDescription,
      date,
      location,
      venue,
      price,
      festival,
    } = this.state.entry.fields;

    return (
      <div className="eventPage">
        <h1 className="title">{title}</h1>
        {festival && (
            <h2 className="festivalTitle">
              <Link to="/">
                {festival.fields.title}
              </Link>
            </h2>
        )}
        <h2>
          <div className="date">
            {
              // @ts-ignore
              date && moment(date).tz('America/Los_Angeles').format('lll')
            }
          </div>

          {venue && (
              <span className="venue">
                at&nbsp;
                {(location) ? (
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lon}`} target="_blank" rel="noreferrer">
                    {venue}
                  </a>
                ) : (
                  <span>{venue}</span>
                )}
              </span>
          )}

          <div className="price">
            {price}
          </div>
      </h2>
        {longDescription ? (
          <p className="description">
            <RichText content={longDescription} />
          </p>
        ) : (
          <p className="description">
            <RichText content={shortDescription} />
          </p>
        )}
      </div>
    );
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    getEventsBySlug(params.slug)
      .then( (entry: any) => this.setState({
          entry: entry.items[0]
      })).catch(console.log);
  }
};

export default EventPage;
