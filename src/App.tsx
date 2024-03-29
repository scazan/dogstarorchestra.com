import * as React from 'react';
import { getEntries } from './util/store';
import YearPreview from './components/YearPreview/index';
import './App.css';

interface State {
  events: any[];
  years: any[];
}

class App extends React.Component<object, State> {
  constructor(props: any) {
    super(props);
    // GLOBAL STATE
    this.state = {
      events: [],
      years: [],
    };
  }
  public render() {
    const yearsAndEvents = this.state.years.reduce((accum, year: any) => {
      accum[year.sys.id] = this.state.events.filter(event =>
       event && event.fields && event.fields.festival && (event.fields.festival.sys.id === year.sys.id) && (event.fields.slug !== 'test'));
      return accum;
    }, {});

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

    document.title = `The Dog Star Orchestra`;

    Promise.all([
      getEntries(['festivalEvent'])
        .then( entries => events = entries[0]),
      getEntries(['festivalYear'])
        .then( entries => years = entries[0]),
    ])
    .then(() => {
      years = years.sort((year:any, nextYear: any) => new Date(nextYear.fields.year).getFullYear() - new Date(year.fields.year).getFullYear());
      events = events.sort((event:any, nextEvent: any) => new Date(event.fields.date).getTime() - new Date(nextEvent.fields.date).getTime());

      this.setState({
        events,
        years,
      });
    });

  }
}

export default App;
