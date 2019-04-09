import * as React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component<any,any> {
  componentDidUpdate(prevProps:any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop);
