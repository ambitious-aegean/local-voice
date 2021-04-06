/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable default-case */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      address: '',
      location,
      categories: [],
      message: '',
      photos: [],
      reps: [],
    };

    this.coordinatesToAddress = this.coordinatesToAddress.bind(this);
    this.addressToCoordinates = this.addressToCoordinates.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const address = this.coordinatesToAddress(location);
    console.log('ADDRESS:', address);
    this.setState({ address });
  }

  handleChange(event) {
    const {
      address, categories, message, photos, reps,
    } = this.state;
    const { id, val } = event.target;
    this.setState({
      [id]: val,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  setLocation() {
    const { address } = this.state;
    const location = this.addressToCoordinates(address);
    this.setState({ location });
    this.getReps();
  }

  getReps() {
    const { location } = this.state;
    axios.get('/reps', {
      params: {
        lat,
        lng,
      },
    })
      .then((resp) => {
        this.setState({ reps: resp.data.officials });
      })
      .catch((err) => console.log(err));
  }

  coordinatesToAddress(location) {
    let address = '';
    const { lat, lng } = location;
    axios.get('/address', {
      params: {
        lat,
        lng,
      },
    })
      .then((resp) => {
        address = resp.data.results.formatted_address;
      })
      .catch((err) => console.log(err));
    return address;
  }

  addressToCoordinates(address) {
    let location = {};
    axios.get('/location', {
      params: {
        address,
      },
    })
      .then((resp) => {
        location = resp.data.results.geometry.location;
      })
      .catch((err) => console.log(err));
    return location;
  }

  render() {
    return (
      <div id="issueForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="address">
            Address
            <input type="text" onChange={this.handleChange} required id="address" />
          </label>
          <button type="button" id="setLocation" onClick={this.setLocation}>set location</button>
          <label htmlFor="categories">
            Categories
            <input type="checkbox" onChange={this.handleChange} required id="categories" />
          </label>
          <label htmlFor="message">
            Message
            <input type="text" onChange={this.handleChange} required id="message" />
          </label>
          <label htmlFor="photos">
            Photos
            <input type="file" onChange={this.handleChange} required id="photos" />
          </label>
          <label htmlFor="reps">
            Choose a Rep
            <input type="text" onChange={this.handleChange} required id="reps" />
          </label>
          <input type="submit" value="Submit Issue" />
        </form>
      </div>
    );
  }
}

IssueForm.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default IssueForm;
