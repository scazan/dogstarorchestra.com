import * as React from 'react';
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
  entry: {
    fields: {
      title: string,
        description: string|null,
        longDescription: string|null,
    },
  },
}

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
    console.log(this.state);
    const {title, description, longDescription} = this.state.entry.fields;
    return (
      <div className="eventPage">
        <h1 className="title"> AN EVENT number: {title}  </h1>
        <p>
      {longDescription ? (
        {longDescription}
      ) : (
        {description}
      )}
        </p>
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
