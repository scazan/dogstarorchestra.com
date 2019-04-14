import * as React from 'react';
import { Link } from "react-router-dom";
import { fetchEntriesForContentType, state } from '../../util/store';
import './index.scss';

interface IProps {
}
interface IState {
  pages: any,
}

class SiteMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      pages: [],
    };

    fetchEntriesForContentType('page')
      .then( (pages: any) => this.setState({pages}));
  }
  public render() {
    console.log('>>>', this.state.pages);
    return (
      <div className="menu"
        style={{backgroundColor: state.backgroundColor}}
      >
        <div className="menuItems">
          {this.state.pages.map( (page: any) => (
            <Link to={`/${page.fields.slug}`}>
              <div className="menuItem">{page.fields.title}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default SiteMenu;
