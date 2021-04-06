/* eslint-disable react/jsx-one-expression-per-line */
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
      category: '',
      title: '',
      text: '',
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
    this.setReps(location);
  }

  handleChange(event) {
    const {
      address, categories, text, photos, reps,
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
    const { address, location } = this.state;
    this.setCoordinatesFromAddress(address, this.setReps);
  }

  setReps(location) {
    const { lat, lng } = location;
    console.log('set reps', lat, lng);
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
      })
      .catch((err) => { throw err; });
  }

  setCoordinatesFromAddress(address, callback) {
    axios.get('/location', {
      params: {
        address,
      },
    })
      .then((resp) => {
        this.setState({ location: resp.data });
        callback(resp.data);
      })
      .catch((err) => { throw err; });
  }

  render() {
    const { address, reps } = this.state;
    return (
      <div id="issueForm">
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={this.handleSubmit}>
          <label htmlFor="address">
            Address
            <input style={{ width: '300px' }} type="text" value={address} onChange={this.handleChange} required id="address" />
          </label>
          <button style={{ width: '100px' }} type="button" id="setLocation" onClick={this.setLocation}>set location</button>
          <label htmlFor="category">
            Categories
            <select name="category" id="category">
              <option value="nuisance">nuisance</option>
              <option value="public agencies">public angencies</option>
              <option value="infrastructure">infrastructure</option>
              <option value="safety">safety</option>
              <option value="waste">waste</option>
              <option value="permits">permits</option>
              <option value="stolen mail">stolen mail</option>
            </select>
          </label>
          <label htmlFor="title">
            title
            <input type="text" onChange={this.handleChange} required id="title" />
          </label>
          <label htmlFor="text">
            text
            <input type="text" onChange={this.handleChange} required id="text" />
          </label>
          <label htmlFor="photos">
            Photos
            <input type="file" onChange={this.handleChange} required id="photos" />
          </label>
          <label htmlFor="reps">
            Choose a Rep
            <select name="rep" id="rep">
              {reps.map((rep) => (
                <option key={rep.name}>
                  {rep.name} ({rep.title})
                </option>
              ))}
            </select>
          </label>
          <input style={{ width: '100px' }} type="submit" value="submit issue" />
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
