const axios = require('axios');
require('dotenv').config();

const key = process.env.GEOCODE_API_KEY;

// geocoding
const getLocation = (req, res) => {
  const { address } = req.query;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      key,
      address,
    },
  })
    .then((resp) => {
      res.send(resp.data.results[0].geometry.location);
    })
    .catch(() => res.sendStatus(400));
};

// reverse geocoding
const getAddress = (req, res) => {
  const { lat, lng } = req.query;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      key,
      latlng: `${lat},${lng}`,
    },
  })
    .then((resp) => res.send(resp.data.results[0].formatted_address))
    .catch(() => res.sendStatus(400));
};

module.exports = {
  getLocation,
  getAddress,
};
