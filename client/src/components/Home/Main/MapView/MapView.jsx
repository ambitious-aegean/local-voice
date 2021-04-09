/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import PropTypes from 'prop-types';
import MapIssueModal from './MapIssueModal/MapIssueModal.jsx';
import styles from './MapIssueModal/styles.module.css';

// import InfoWindowEx from './MapIssueModal/InfoWindowEx.jsx';

// import API_TOKEN from './mapConfig.js';

const mapStyles = {
  width: '58%',
  height: '90%',
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
    this.onMapDragEnd = this.onMapDragEnd.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    // this.onInfoWindowOpen = this.onInfoWindowOpen.bind(this);
    // this.displayModal = this.displayModal.bind(this);
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

  onMapDragEnd(mapProps, map) {
    const { getLoc } = this.props;
    const lat = map.getCenter().lat();
    const lng = map.getCenter().lng();
    const location = { lat, lng };
    this.setState({
      location,
    });
    getLoc(location);
  }

  // displayModal() {
  //   console.log('show modal');
  //   return (
  //     // <div>hello </div>
  //     <MapIssueModal />
  //   )
  // }

  // onInfoWindowOpen(props, e) {
  //   const button = (
  //     <button
  //       onClick={(e) => {this.displayModal}}
  //     >
  //       modal
  //     </button>
  //   );
  //   ReactDOM.render(
  //     React.Children.only(button),
  //     document.getElementById("iwc")
  //   );
  // }

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
    const { displayedIssues } = this.props;
    if (displayedIssues) {
      return displayedIssues.map((issue, i) => (
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
    return null;
  }

  // showDetails() {
  //   return (
  //     <MapIssueModal />
  //   )
  // }

  displayInfoWindow() {
    return (
      <InfoWindow
        marker={this.state.activeMarker}
        // onOpen={this.onOpen}
        onOpen={e => {
          this.onInfoWindowOpen(this.props, e);
        }}
        onClose={this.onClose}
        visible={this.state.showingInfoWindow}
        style={infoWindowStyles}
      >
        {/* <div id="iwc" /> */}
        <div>
          <h3>
            {this.state.selectedIssue.title}
          </h3>
          <h4>
            {this.state.selectedIssue.text}
          </h4>
          <img className={styles.image} src={this.state.selectedIssue.url} alt="" /> 
        {/* <MapIssueModal issue={this.state.selectedIssue} /> */}
        {/* <button
            type="button"
            onClick={this.showDetails}
          >
            Show Details
          </button> */}
        </div>
      </InfoWindow>
    );
  }

  // displayIssueModal() {
  //   const { selectedIssue } = this.state;
  //   // invoke axios.get request for comments here?? or within MapIssueModal
  //   // conditionally render MapIssueModal based on state
  //   return (
  //     <MapIssueModal issue={selectedIssue} />
  //   );
  // }

  render() {
    const { displayedIssues } = this.props;
    const { location } = this.state;
    const { lat, lng } = location;
    if (!displayedIssues || !location) {
      return (
        <div>
          Loading
        </div>
      );
    }
    return (
      <div id="mapView">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat, lng }} // based on user location
          displayedIssues={displayedIssues}
          // draggable={true}
          onDragend={(mapProps, map) => this.onMapDragEnd(mapProps, map)}
        >
          {this.displayMarkers()}
          {this.displayInfoWindow()}
          {/* {this.displayModal()} */}
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
