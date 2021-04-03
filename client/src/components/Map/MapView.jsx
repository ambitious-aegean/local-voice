import React from 'react';
import {
  Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import PropTypes from 'prop-types';

import API_TOKEN from '../../../../mapConfig';

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  render() {
    const { issues } = this.props;
    return (
      <Map
        google={this.props.google} // it says to do this but I don't know if it's actually necessary
        zoom={8}
        // style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
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
};
