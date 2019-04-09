import * as React from 'react';
import moment from 'moment';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link } from "react-router-dom";
import { getEntry } from '../../util/store';
import './index.scss';

interface IProps {
  match: {
    params: {
      id: number,
    }
  }
}
interface IState {
  entry: any,
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

class EventPage extends React.Component<IProps, IState> {
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
      description,
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
            {date && moment(date).format('ll')}
          </div>

          {venue && (
              <span className="venue">
                &nbsp;at&nbsp;
                {(location) ? (
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lon}`} target="_blank">
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
            {documentToReactComponents(longDescription, options)}
          </p>
        ) : (
          <p className="description">
            {description}
          </p>
        )}
      </div>
    );
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    getEntry(params.id)
      .then( (entry: any) => this.setState({
        entry
      }));
  }
};

export default EventPage;
