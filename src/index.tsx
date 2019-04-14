import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { state }  from './util/store';
import ScrollToTop from './ScrollToTop';
import App from './App';
import EventPage from './pages/EventPage/index';
import Page from './pages/Page/index';
import Menu from './components/SiteMenu/index';
import './index.css';

const routing = (
  <Router>
  <ScrollToTop>
    <div
      style={{backgroundColor: state.backgroundColor, paddingTop: '100px'}}
    >
      <Switch>
        <Route path="/event/:slug" component={EventPage}/>
        <Route path="/:id" component={Page}/>
        <Route path="/" component={App}/>
      </Switch>
      <Menu/>
    </div>
  </ScrollToTop>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
