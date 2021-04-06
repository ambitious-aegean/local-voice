const axios = require('axios');

const key = process.env.GEOCODE_API_KEY;

// geocoding
const getLocation = (req, res) => {
  const { address } = req.query;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address,
      key,
    },
  }).then((resp) => res.send(resp))
    .catch(() => res.sendStatus(400));
};

// reverse geocoding
const getAddress = (req, res) => {
  console.log('req.query:', req.query);
  let { lat, lng } = req.query;
  lat = parseFloat(lat);
  lng = parseFloat(lng);
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&latlng=${lat}, ${lng}`)
    .then((resp) => res.send(resp))
    .catch(() => res.sendStatus(400));
};

module.exports = {
  getLocation,
  getAddress,
};
