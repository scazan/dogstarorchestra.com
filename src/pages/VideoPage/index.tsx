import * as React from 'react';
import moment from 'moment';
import RichText from '../../components/RichText/index';
import { Link } from "react-router-dom";
import { getEventsBySlug } from '../../util/store';
import VideoPreview from '../../components/VideoPreview/index';
import './index.scss';

interface IProps {
  match: {
    params: {
      slug: string,
    }
  }
}
interface IState {
  includes: any,
  entry: any,
}

const EventPage = class EventPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      includes: {
        Entry: [],
      },
      entry: {
        fields: {
          title: '',
          description: null,
          longDescription: null,
        },
      },
    };

    this.renderVideos = this.renderVideos.bind(this);
  }

  renderVideos(videos: any) {
    const linkedDocuments = this.state.includes?.Entry;

    const videoEntries = videos.map(video => linkedDocuments
      .find(linkedDocument => linkedDocument.sys.id === video.sys.id)
    );

    console.log(videoEntries);
    if (videoEntries.length > 0) {
      return (
        <>
          {videoEntries.map(entry => (
            <VideoPreview
              event={entry}
              includes={this.state.includes.Asset}
            />
          ))}
        </>
      );
    }


    return <></>;
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
      videos,
    } = this.state.entry.fields;

    console.log(videos);

    const hasVideos = videos?.length > 0;

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
        <div className={`pageContent${hasVideos ? '' : ' short'}`}>
          {longDescription ? (
            <p className="description">
              <RichText content={longDescription} />
            </p>
          ) : (
            <p className="description">
              <RichText content={shortDescription} />
            </p>
          )}

          {hasVideos && this.renderVideos(videos)}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    getEventsBySlug(params.slug)
      .then( (entry: any) => this.setState({
          entry: entry.items[0],
          includes: entry.includes,
      })).catch(console.log);
  }
};

export default EventPage;
