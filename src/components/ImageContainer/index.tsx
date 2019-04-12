import * as React from 'react';
import './index.scss';

interface IProps {
  description: string;
  url: string;
}
interface IState {
}

class ImageContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    };
  }
  public render() {
    const { url, description } = this.props;
    return (
      <div className="image">
        <img src={url} alt={description} />
        {description && <div className="caption">{description}</div>}
      </div>
    );
  }
};

export default ImageContainer;
