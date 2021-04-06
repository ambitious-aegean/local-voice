/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import PropTypes from 'prop-types';
import MapIssueModal from './MapIssueModal/MapIssueModal.jsx';

// import API_TOKEN from './mapConfig.js';

const mapStyles = {
  width: '60%',
  height: '93%',
};

const infoWindowStyles = {
  width: 100,
  height: 100,

};

class MapView extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      location,
      showingInfoWindow: false,
      // showingIssueModal: false,
      activeMarker: null,
      selectedIssue: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.displayMarkers = this.displayMarkers.bind(this);
    this.displayInfoWindow = this.displayInfoWindow.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }

  componentDidMount() {
    this.getUserLocation();
    // this.displayMarkers();
  }

  onClose(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedIssue: props,
      activeMarker: marker,
      showingInfoWindow: true,
    }, this.displayInfoWindow);
  }

  getUserLocation() {
    const { getLoc } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.setState({
          location,
        });
        getLoc(location);
      });
    }
  }

  displayMarkers() {
    return this.props.displayedIssues.map((issue, i) => (
      <Marker
        key={i}
        title={issue.title}
        text={issue.text}
        url={issue.photos[0]}
        onClick={this.onMarkerClick}
        position={{
          lat: issue.lat,
          lng: issue.lng,
        }}
      />
    ));
  }

  displayInfoWindow() {
    return (
      <InfoWindow
        marker={this.state.activeMarker}
        onOpen={this.onOpen}
        onClose={this.onClose}
        visible={this.state.showingInfoWindow}
        style={infoWindowStyles}
      >
        <div>
          Info Window
          <h4>
            {this.state.selectedIssue.title}
          </h4>
          <h4>
            {this.state.selectedIssue.text}
          </h4>
          <img src={this.state.selectedIssue.url} alt="" />
          {/* <MapIssueModal issue={this.state.selectedIssue} /> */}
        </div>
      </InfoWindow>
    );
  }

  displayIssueModal() {
    const { selectedIssue } = this.state;
    // invoke axios.get request for comments here?? or within MapIssueModal
    // conditionally render MapIssueModal based on state
    return (
      <MapIssueModal issue={selectedIssue} />
    );
  }

  render() {
    const { displayedIssues } = this.props;
    const { location } = this.state;
    const { lat, lng } = location;
    return (
      <div id="mapView">
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat, lng }} // based on user location
          displayedIssues={displayedIssues}
          draggable={false}
        >
          {this.displayMarkers()}
          {this.displayInfoWindow()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_API_KEY,
})(MapView);

MapView.propTypes = {
  displayedIssues: PropTypes.arrayOf(PropTypes.object).isRequired,
  getLoc: PropTypes.func.isRequired,
};
