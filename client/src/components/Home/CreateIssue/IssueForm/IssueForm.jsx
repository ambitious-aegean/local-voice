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
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postIssue = this.postIssue.bind(this);
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
    this.fileUploadHandler()
      .then(() => this.postIssue())
      .catch((err) => console.log(err));
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

  postIssue() {
    const {
      user, location, categories, title, text, photos, selectedRep,
    } = this.state;
    const { closeForm } = this.props;

    axios.post('/issues', {
      user_id: user.user_id,
      lat: location.lat,
      lng: location.lng,
      categories,
      title,
      text,
      photos,
      rep_name: selectedRep.name,
      rep_email: selectedRep.email,
      rep_photo_url: selectedRep.photoUrl,
      date: new Date(),
    })
      .then((response) => {
        console.log(response.data);
        closeForm();
      })
      .catch((error) => {
        console.log(error);
      });
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

  fileUploadHandler() {
    const { photoFiles, user } = this.state;
    const photo = photoFiles[0];
    const formData = new FormData();
    formData.append('photo', photo);
    return axios.post('/photo', formData)
      .then((resp) => {
        const { photos } = this.state;
        console.log(resp.data);
        photos.push(resp.data.toString());
        this.setState({ photos });
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
    const { address, reps, photos } = this.state;
    const { closeForm } = this.props;
    const categories = ['infrastructure', 'nuisance', 'theft', 'safety', 'waste', 'permits', 'crime'];
    return (
      <div id={styles.formBackground}>
        <form onSubmit={this.handleSubmit}>
          <div id={styles.icon} onClick={closeForm}>
            <img src="icons/close.png" alt="close" />
          </div>
          <label htmlFor="address">
            Location/Address
            <input id={styles.address} type="text" value={address} onChange={this.handleChange} required name="address" />
          </label>
          <button id={styles.setLocation} type="button" name="setLocation" onClick={this.setLocation}>
            set location
          </button>
          <label htmlFor="title">
            Issue
          </label>
          <input id={styles.title} type="text" onChange={this.handleChange} required name="title" />
          <label htmlFor="text">
            Description
          </label>
          <textarea id={styles.text} type="text" onChange={this.handleChange} required name="text" />
          <div id={styles.categories}>
            Check all that apply
            {categories.map((category, index) => (
              <div className={styles.category} key={category}>
                <input onChange={this.addCategory} type="checkbox" value={index + 1} />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
          <label htmlFor="photos">
            Photos (optional)
            <input id={styles.chooseFile} type="file" onChange={this.fileSelectedHandler} name="photos" multiple />
            <button onClick={this.fileUploadHandler}>upload photos</button>
          </label>
          <label htmlFor="reps">
            Choose a Rep
            <select id={styles.repSelector} onChange={this.handleRepSelect} name="rep">
              {reps.map((rep, index) => (
                <option className={styles.repOption} value={index} key={rep.name}>
                  {rep.name} ({rep.title})
                </option>
              ))}
            </select>
          </label>
          <input id={styles.formSubmit} type="submit" value="submit issue" />
        </form>
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
