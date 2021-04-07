/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
      categories: [],
      title: '',
      text: '',
      photos: [],
      reps: [],
      selectedRep: {},
    };

    this.setAddressFromCoordinates = this.setAddressFromCoordinates.bind(this);
    this.setCoordinatesFromAddress = this.setCoordinatesFromAddress.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setReps = this.setReps.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.handleRepSelect = this.handleRepSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    this.setAddressFromCoordinates(location);
  }

  handleChange(event) {
    const {
      address, title, text,
    } = this.state;
    const { id, value } = event.target;
    if (id === 'address') {
      this.setState({ address: value });
    } else if (id === 'title') {
      this.setState({ title: value });
    } else if (id === 'text') {
      this.setState({ text: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleRepSelect(event) {
    const { value } = event.target;
    const { reps } = this.state;
    this.setState({ selectedRep: reps[value] });
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

  setLocation() {
    const { address } = this.state;
    this.setCoordinatesFromAddress(address);
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

  fileSelectedHandler(event) {
    this.setState({ photos: event.target.files });
  }

  addCategory(event) {
    const { categories } = this.state;
    const { value } = event.target;
    categories.push(value);
    this.setState({ categories });
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
          <div>
            Categories
            <input onChange={this.addCategory} type="checkbox" id="nuisance" value="nuisance" />
            <label htmlFor="nuisance"> nuisance</label>
            <input onChange={this.addCategory} type="checkbox" id="public-agencies" value="public agencies" />
            <label htmlFor="public-agencies">public agencies</label>
            <input onChange={this.addCategory} type="checkbox" id="infrastructure" value="infrastructure" />
            <label htmlFor="infrastructure">infrastructure</label>
            <input onChange={this.addCategory} type="checkbox" id="safety" value="safety" />
            <label htmlFor="safety"> safety</label>
            <input onChange={this.addCategory} type="checkbox" id="waste" value="waste" />
            <label htmlFor="waste">waste</label>
            <input onChange={this.addCategory} type="checkbox" id="permits" value="permits" />
            <label htmlFor="permits">permits</label>
            <input onChange={this.addCategory} type="checkbox" id="stolen-mail" value="stolen mail" />
            <label htmlFor="stolen-mail"> stolen mail</label>
          </div>
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
            <input type="file" onChange={this.fileSelectedHandler} required id="photos" multiple />
            <button onClick={this.fileUploadHandler}>upload photos</button>
          </label>
          <label htmlFor="reps">
            Choose a Rep
            <select onChange={this.handleRepSelect} name="rep" id="rep">
              {reps.map((rep, index) => (
                <option value={index} key={rep.name}>
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
