import * as React from 'react';
import { displayEntries } from './util/store';
import YearPreview from './components/YearPreview/index';
import './App.css';

interface State {
  events: any[];
  years: any[];
}

class App extends React.Component<object, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      events: [],
      years: [],
    };
  }
  public render() {
    const yearsAndEvents = this.state.years.reduce((accum, year: any) => {
      accum[year.sys.id] = this.state.events.filter(event =>
       event && event.fields && event.fields.festival && (event.fields.festival.sys.id === year.sys.id));
      return accum;
    }, {});

    console.log(yearsAndEvents);
    return (
      <div className="App">
      {this.state.years.map((year: any, i) =>
        <YearPreview
          year={year}
          events={yearsAndEvents[year.sys.id]}
        />
      )}
      </div>
    );
  }

  componentDidMount() {
    let events: any = [];
    let years: any = [];

    Promise.all([
      displayEntries(['festivalEvent'])
        .then( entries => events = entries[0]),
      displayEntries(['festivalYear'])
        .then( entries => years = entries[0]),
    ])
    .then(() => {
      this.setState({
        events,
        years,
      });
    });
  }
}

export default App;
