import * as React from 'react';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ImageContainer from '../../components/ImageContainer/index';
import './index.scss';

const documentRenderOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
          const { file: {url}, description } = node.data.target.fields;
          return (
            <ImageContainer
              url={url}
              description={description}
            />
          );
        },
    },
};

interface IProps {
  content: any,
}

class RichText extends React.Component<IProps> {
  public render() {
    return (
      <p className="content">
        {documentToReactComponents(this.props.content, documentRenderOptions)}
      </p>
    );
  }
};

export default RichText;
