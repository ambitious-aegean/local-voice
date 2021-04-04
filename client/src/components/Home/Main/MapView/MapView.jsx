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
  }

  // onMarkerClick
  // onInfoWindowClick

  render() {
    const { issues, setLoc } = this.props;
    return (
      <Map
        google={this.props.google} // it says to do this but I don't know if it's actually necessary
        zoom={8}
        // style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }} // based on user location
      >
        {issues.map((issue) => (
          <div>
            <Marker position={{ lat: issue.loc.lat, lng: issue.loc.lng }} />
            <InfoWindow
              onOpen={() => {}}
              onClose={() => {}}
              visible={() => {}}
            >
              <div>
                hi
                <div role="button" onClick={() => {}} onKeyPress={() => {}} tabIndex={0}>
                  see more
                </div>
              </div>
            </InfoWindow>
          </div>
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_TOKEN,
})(MapView);

MapView.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object).isRequired,
  setLoc: PropTypes.func.isRequired,
};
