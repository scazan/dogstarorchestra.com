import * as React from 'react';
import { Link } from "react-router-dom";
import RichText from '../RichText/index';
import './index.scss';

interface IProps {
  event: any,
  includes: any,
}

class VideoPreview extends React.Component<IProps> {
  private imageRef: React.Ref<any>;

  constructor(props) {
    super(props);

    this.imageRef = React.createRef();
    this.onHover = this.onHover.bind(this);
  }

  onHover(hovering) {
    // @ts-ignore
    if (this.imageRef?.current) {
      // @ts-ignore
      const container = this.imageRef.current;
      const image = container.querySelector('.thumb');

      if (hovering) {
        const containerSize = Math.floor(container.getBoundingClientRect().width);
        image.style.width = containerSize + 'px';
        image.style.display = 'block';
      }
      else {
        image.style.display = 'none';
      }
    }
  }

  public render() {
    const event = this.props.event.fields;

    const thumb = this.props.includes
      .find(linkedDocument => linkedDocument.sys.id === event.thumb.sys.id);

    const thumbUrl = thumb.fields.file.url;

    return (
      <Link to={`/event/screening/${this.props.event.fields.slug}`}>
        <div
          className={`eventPreview videoPreview`}
          ref={this.imageRef}
        >
          <div className="date">
            <RichText content={event.technicalDetails} />
          </div>

          <div className="thumb">
            <img src={thumbUrl} />
          </div>

          <div className="title">
            {event.author}<span className="arrow">⟶</span>
          </div>
          <div className="description">
            {event.title}
          </div>
          
        </div>
      </Link>
    );
  }
};

export default VideoPreview;
