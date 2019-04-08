import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import EventPage from './pages/EventPage/index';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const backgroundColor = {
  backgroundColor: `hsl(${parseInt((Math.random() * 357).toString(), 10)}, 100%, 92%, 1)`,
};

const routing = (
  <Router>
    <div
      style={backgroundColor}
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
