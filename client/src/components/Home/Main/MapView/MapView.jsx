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
  width: '50%',
  height: '400px',
};

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      showingIssueModal: false,
      activeMarker: null,
      selectedIssue: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.displayMarkers = this.displayMarkers.bind(this);
    this.displayInfoWindow = this.displayInfoWindow.bind(this);
    // this.onWindowClick = this.onWindowClick.bind(this);
  }

  componentDidMount() {
    this.displayMarkers();
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedIssue: props,
      activeMarker: marker,
      showingInfoWindow: true,
    }, this.displayInfoWindow);
  }

  onClose(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  // onWindowClick(e) {
  //   this.setState({
  //     showingIssueModal: true
  //   }, this.displayIssueModal);
  // }

  displayMarkers() {
    return this.props.displayedIssues.map((issue, i) => (
      <Marker
        key={i}
        title={issue.title}
        text={issue.text}
        url={issue.photos[0]}
        onMouseover={this.onMarkerClick}
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
        onClose={this.onClose}
        visible={this.state.showingInfoWindow}
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
          <div role="button" tabIndex={0}>
            See more ...
          </div>
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
    const { displayedIssues, location, getLoc } = this.props;
    const { lat, lng } = location;
    return (
      <div id="mapView">
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat, lng }} // based on user location
          displayedIssues={displayedIssues}
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
