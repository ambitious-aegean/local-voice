/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import PropTypes from 'prop-types';

import API_TOKEN from './mapConfig';

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showingInfoWindow: false,
      // activeMarker: {},
      // selectedIssue: {},
    };
  }

  // onMarkerClick
  // onInfoWindowClick

  render() {
    const { displayedIssues, location, getLoc } = this.props;
    const { lat, lng } = location;
    return (
      <div id="mapView">
        <Map
          google={this.props.google} // it says to do this but I don't know if it's actually necessary
          zoom={8}
          // style={mapStyles}
          initialCenter={{ lat, lng }} // based on user location
          center={{ lat, lng }}
        >
          {displayedIssues.map((issue) => {
            const { loc } = issue;
            return (
              <div key="i">
                <Marker position={{ lat: loc.lat, lng: loc.lng }} />
                <InfoWindow
                  onOpen={() => {}}
                  onClose={() => {}}
                  visible={false}
                >
                  <div>
                    Info Window
                    <div role="button" onClick={() => {}} onKeyPress={() => {}} tabIndex={0}>
                      see more
                    </div>
                  </div>
                </InfoWindow>
              </div>
            );
          })}
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
