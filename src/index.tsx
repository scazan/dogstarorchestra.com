import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import App from './App';
import EventPage from './pages/EventPage/index';
import Page from './pages/Page/index';
import Menu from './components/SiteMenu/index';
import './index.css';

const backgroundColor = {
  backgroundColor: `hsl(${parseInt((Math.random() * 357).toString(), 10)}, 100%, 92%, 1)`,
};

const routing = (
  <Router>
  <ScrollToTop>
    <div
      style={{...backgroundColor, ...{paddingTop: '100px'}}}
    >
      <Switch>
        <Route path="/event/:id" component={EventPage}/>
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
