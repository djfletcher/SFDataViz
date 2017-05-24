import React from 'react';
import { Provider } from 'react-redux';
import DataMap from './map/map';


class App extends React.Component {
  render() {
    return (
      <div id="map">
        <DataMap />
      </div>
    );
  }
}

export default App;
