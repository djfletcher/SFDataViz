import React from 'react';
import { Provider } from 'react-redux';
import DataMapContainer from './map/map_container';


class App extends React.Component {
  render() {
    return (
      <Provider store={ this.props.store }>
        <div id="map">
          <DataMapContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
