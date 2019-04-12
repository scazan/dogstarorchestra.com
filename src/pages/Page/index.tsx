import * as React from 'react';
import { Link } from "react-router-dom";
import { getEntry } from '../../util/store';
import RichText from '../../components/RichText/index';
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
    getEntry(params.id)
      .then( (entry: any) => this.setState({
        entry
      }));
  }
};

export default EventPage;
