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

  updateVideoSize() {
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
          <div className="screeningMenu content">
            <h2><span className="arrow">⟵</span><Link to="/event/dog-star-film-screening">The Dog Star Orchestra 17<br/>Film Screening</Link></h2>
              <p><Link to="/event/screening/you-dont-own-me">1. Christina C Nguyen</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/whats-a-life">2. Dicky Bahto</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/something-to-touch-that-is-not-corruption-or-ashes-or-dust">3. Mike Stoltz</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/first-love">4. Ziyao Susan Xie</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/soft-tremors">5. kevin corcoran</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/wander">6. Qianyi Ma</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/gutterball">7. Sam Gurry</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/no-garden-beyond">8. Anna Kipervaser and Rhys Morgan</Link><span className="arrow">⟶</span></p>
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

          <div className="screeningMenu mobile content">
            <h2><Link to="/event/dog-star-film-screening">The Dog Star Orchestra 17<br/>Film Screening</Link></h2>
              <p><Link to="/event/screening/you-dont-own-me">1. Christina C Nguyen</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/whats-a-life">2. Dicky Bahto</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/something-to-touch-that-is-not-corruption-or-ashes-or-dust">3. Mike Stoltz</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/first-love">4. Ziyao Susan Xie</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/soft-tremors">5. kevin corcoran</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/wander">6. Qianyi Ma</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/gutterball">7. Sam Gurry</Link><span className="arrow">⟶</span></p>
              <p><Link to="/event/screening/no-garden-beyond">8. Anna Kipervaser and Rhys Morgan</Link><span className="arrow">⟶</span></p>
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

        document.title = `${entry.items[0].fields.title} - The Dog Star Orchestra`;
        return entry;
      })
      .then( (entry: any) => this.setState({
          entry: entry.items[0],
          includes: entry.includes,
      }))
      .then(this.updateVideoSize.bind(this))
      .catch(console.log);

  }

  componentDidUpdate(prevProps) {
    const { match: { params } } = this.props;
    if (prevProps.match.params.slug !== params.slug) {
      getVideosBySlug(params.slug)
        .then( (entry: any) => {
          console.log(entry);

          return entry;
        })
        .then( (entry: any) => this.setState({
          entry: entry.items[0],
          includes: entry.includes,
        }))
        .then(this.updateVideoSize.bind(this))
        .catch(console.log);
    }
  }
};

export default EventPage;
