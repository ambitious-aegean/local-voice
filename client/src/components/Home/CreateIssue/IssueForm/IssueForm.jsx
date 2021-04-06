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

    this.setAddressFromCoordinates = this.setAddressFromCoordinates.bind(this);
    this.setCoordinatesFromAddress = this.setCoordinatesFromAddress.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setReps = this.setReps.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    this.setAddressFromCoordinates(location);
  }

  handleChange(event) {
    const {
      address, categories, message, photos, reps,
    } = this.state;
    const { id, value } = event.target;
    if (id === 'address') {
      this.setState({ address: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  setLocation() {
    const { address } = this.state;
    this.setCoordinatesFromAddress(address);
  }

  setReps(location) {
    const { lat, lng } = location;
    axios.get('/reps', {
      params: {
        lat,
        lng,
      },
    })
      .then((resp) => {
        this.setState({ reps: resp.data });
      })
      .catch((err) => console.log(err));
  }

  setAddressFromCoordinates(location) {
    const { lat, lng } = location;
    axios.get('/address', {
      params: {
        lat,
        lng,
      },
    })
      .then((resp) => {
        this.setState({ address: resp.data });
        this.setReps(location);
      })
      .catch((err) => { throw err; });
  }

  setCoordinatesFromAddress(address) {
    axios.get('/location', {
      params: {
        address,
      },
    })
      .then((resp) => {
        this.setState({ location: resp.data });
        this.setReps(resp.data);
      })
      .catch((err) => { throw err; });
  }

  render() {
    const { address, reps } = this.state;
    console.log(reps);
    return (
      <div id="issueForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="address">
            Address
            <input type="text" value={address} onChange={this.handleChange} required id="address" />
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
