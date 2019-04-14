import * as React from 'react';
import { Link } from "react-router-dom";
import { getPagesBySlug } from '../../util/store';
import RichText from '../../components/RichText/index';
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

class EventPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      entry: {
        fields: {
          title: '',
          content: null,
        },
      },
    };

  }

  public render() {
    const {
      title,
      content,
    } = this.state.entry.fields;

    return (
      <div className="page">
        <h1 className="title">{title}</h1>
            <h2 className="festivalTitle">
              <Link to="/">
                Back to Home
              </Link>
            </h2>
        {content && (
          <RichText content={content} />
        )}
      </div>
    );
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    getPagesBySlug(params.slug)
      .then( (entry: any) => this.setState({
        entry: entry.items[0],
      }));
  }
};

export default EventPage;
