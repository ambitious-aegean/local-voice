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
      showingInfoWindow: false,
      activeMarker: null,
      selectedIssue: null,
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.displayMarkers = this.displayMarkers.bind(this);
    this.displayInfoWindows = this.displayInfoWindows.bind(this);
  }

  onMarkerClick() {
    this.setState({
      showingInfoWindow: true,
    }, this.displayInfoWindow);
  }

  onClose (props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  displayMarkers() {
    return this.props.displayedIssues.map((issue) => (
      <Marker
        onClick={this.onMarkerClick}
        position={{
          lat: issue.loc.lat,
          lng: issue.loc.lng,
        }}
      />
    ));
  }

  displayInfoWindows() {
    return (
      <InfoWindow
        onClose={this.onClose}
        visible={this.state.showingInfoWindow}
      >
        <div>
          Info Window
        </div>
      </InfoWindow>
    );
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
          {this.displayInfoWindows()}
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
