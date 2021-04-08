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
import * as Buffer from 'buffer';
import styles from '../styles/issueForm.module.css';

class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    const { location, user } = this.props;
    this.state = {
      address: '',
      location,
      user,
      categories: [],
      title: '',
      text: '',
      imgSrc: '',
      photoFiles: [],
      photoURLs: [],
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
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    this.setAddressFromCoordinates(location);
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  handleChange(event) {
    const {
      address, title, text,
    } = this.state;
    const { name, value } = event.target;
    if (name === 'address') {
      this.setState({ address: value });
    } else if (name === 'title') {
      this.setState({ title: value });
    } else if (name === 'text') {
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

  escFunction(event) {
    const { closeForm } = this.props;
    if (event.keyCode === 27) {
      closeForm();
    }
  }

  fileSelectedHandler(event) {
    this.setState({ photoFiles: event.target.files });
  }

  fileUploadHandler(event) {
    const { photoFiles, user } = this.state;
    const photo = photoFiles[0];
    const formData = new FormData();
    formData.append('photo', photo);
    axios.post('/photo', formData)
      .then((resp) => {
        const { photoURLs } = this.state;
        photoURLs.push(resp.data.toString());
        this.setState({ photoURLs });
      })
      .catch((err) => console.log(err));
  }

  addCategory(event) {
    const { categories } = this.state;
    const { value } = event.target;
    categories.push(value);
    this.setState({ categories });
  }

  render() {
    const { address, reps, photoURLs } = this.state;
    const { closeForm } = this.props;
    const categories = ['infrastructure', 'nuisance', 'theft', 'safety', 'waste', 'permits', 'crime'];
    return (
      <div id={styles.formBackground}>
        <div id={styles.issueForm}>
          <div className={styles.icon} onClick={closeForm}>
            <img src="icons/close.png" alt="close" />
          </div>
          <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={this.handleSubmit}>
            <label htmlFor="address">
              Address
              <input style={{ width: '300px' }} type="text" value={address} onChange={this.handleChange} required name="address" />
            </label>
            <button style={{ width: '100px' }} type="button" name="setLocation" onClick={this.setLocation}>set location</button>
            <div>
              Categories
              {categories.map((category, index) => (
                <div>
                  <input onChange={this.addCategory} type="checkbox" value={index + 1} />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
            <label htmlFor="title">
              title
              <input id={styles.title} type="text" onChange={this.handleChange} required name="title" />
            </label>
            <label htmlFor="text">
              text
              <input id={styles.text} type="text" onChange={this.handleChange} required name="text" />
            </label>
            <label htmlFor="photos">
              Photos
              <input type="file" onChange={this.fileSelectedHandler} name="photos" multiple />
              <button onClick={this.fileUploadHandler}>upload photos</button>
            </label>
            <label htmlFor="reps">
              Choose a Rep
              <select onChange={this.handleRepSelect} name="rep">
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
      </div>
    );
  }
}

IssueForm.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.number).isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default IssueForm;
