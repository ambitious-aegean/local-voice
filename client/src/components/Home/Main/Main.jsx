import React from 'react';
import Map from './Map/Map.jsx';
import List from './List/List.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const view = { this.props };
    return (
      <div id="main">
        {
          toggle === 'map'
            ? <Map />
            : <List />
        }
      </div>
    );
  }
}

