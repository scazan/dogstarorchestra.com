import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import EventPage from './pages/EventPage/index';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <div
    >
      <Switch>
        <Route path="/event/:id" component={EventPage}/>
        <Route path="/" component={App}/>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
