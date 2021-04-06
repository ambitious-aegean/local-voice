/* eslint-disable no-restricted-syntax */
const axios = require('axios');
require('dotenv').config();

const key = process.env.CIVIC_API_KEY;

const getReps = (req, res) => {
  const { lat, lng } = req.query;
  const address = `${lat},${lng}`;
  axios.get('https://www.googleapis.com/civicinfo/v2/representatives', {
    params: {
      key,
      address,
      levels: 'locality',
    },
  }).then((resp) => {
    const { offices, officials } = resp.data;
    const response = [];
    for (const office of offices) {
      const official = officials[office.officialIndices];
      response.push({
        name: official.name,
        title: office.name,
        email: official.emails[0],
        photoUrl: official.photoUrl || 'noPhoto',
      });
    }
    res.send(response);
  })
    .catch(() => res.send([]));
};

module.exports = {
  getReps,
};
