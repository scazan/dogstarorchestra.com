import * as React from 'react';
import moment from 'moment';
import RichText from '../../components/RichText/index';
import { Link } from "react-router-dom";
import { getVideosBySlug } from '../../util/store';
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
  private embedRef: React.Ref<any>;

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
          embed: '',
        },
      },
    };

    this.embedRef = React.createRef();
  }

  componentDidUpdate() {
    // @ts-ignore
    const embedContainer = this.embedRef.current;

    if (embedContainer) {
      const iframe = embedContainer.querySelector('iframe');
      const aspectRatio = iframe.height / iframe.width;

      const containerWidth = embedContainer.getBoundingClientRect().width;

      console.log(aspectRatio);

      iframe.setAttribute('width', containerWidth);
      iframe.setAttribute('height', containerWidth * aspectRatio);
    }
  }

  public render() {
    console.log(this.state);

    const {
      title,
      author,
      technicalDetails,
      longDescription,
      festival,
      embed,
    } = this.state.entry.fields;

    return (
      <div className="eventPage videoPage">
        <div className="headerGrid">
          <h1 className="title">{author}</h1>
        </div>

        {festival && (
            <h2 className="festivalTitle">
              <Link to="/">
                {festival.fields.title}
              </Link>
            </h2>
        )}
        <div className={`pageContent`}>
          <div className="screeningMenu">
            The Dog Star Orchestra 17 Film Screening
            <ol>
              <li>Christina C Nguyen</li>
              <li>Dicky Bahto</li>
              <li>Mike Stoltz </li>
              <li>Ziyao Susan Xie</li>
              <li>kevin corcoran</li>
              <li>Qianyi Ma </li>
              <li>Sam Gurry</li>
              <li>Anna Kipervaser and Rhys Morgan</li>
            </ol>
          </div>
          <div
            className="videoEmbed"
            ref={this.embedRef}
            dangerouslySetInnerHTML={{ __html: embed }}
          >
          </div>
          <h1 className="title">
            {title}
          </h1>
          <div className="info">
            <p className="date">
              <RichText content={technicalDetails} />
            </p>
            <p className="description">
              <RichText content={longDescription} />
            </p>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    getVideosBySlug(params.slug)
      .then( (entry: any) => {
        console.log(entry);
        return entry;
      })
      .then( (entry: any) => this.setState({
          entry: entry.items[0],
          includes: entry.includes,
      })).catch(console.log);
  }
};

export default EventPage;
