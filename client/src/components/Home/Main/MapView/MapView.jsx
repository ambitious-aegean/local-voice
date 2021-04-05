/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import PropTypes from 'prop-types';

import API_TOKEN from './mapConfig.js';

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showingInfoWindow: false,
      // activeMarker: {},
      // selectedIssue: {},
    };
    this.displayMarkers = this.displayMarkers.bind(this);
  }

  // onMarkerClick
  // onInfoWindowClick

  displayMarkers() {
    return this.props.displayedIssues.map((issue, index) => (
      <Marker
        key={index}
        position={{
          lat: issue.loc.lat,
          lng: issue.loc.lng,
        }}
      />
    ));
  }

  render() {
    const { displayedIssues, location, getLoc } = this.props;
    const { lat, lng } = location;
    return (
      <div id="mapView">
        <Map
          google={this.props.google}
          zoom={12}
          // style={mapStyles}
          initialCenter={{ lat, lng }} // based on user location
          // center={{ lat, lng }}
          displayedIssues={displayedIssues}
        >
          {this.displayMarkers()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_TOKEN,
})(MapView);

MapView.propTypes = {
  displayedIssues: PropTypes.arrayOf(PropTypes.object).isRequired,
  getLoc: PropTypes.func.isRequired,
};
