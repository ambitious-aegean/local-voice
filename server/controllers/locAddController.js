const axios = require('axios');
require('dotenv').config();

const key = process.env.GEOCODE_API_KEY;
//const key = 'AIzaSyA-c6dRChBpUIiL8zUjqd019m_9rm44pFo';

// geocoding
const getLocation = (req, res) => {
  const { address } = req.query;
  console.log('address', address);
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      key,
      address,
    },
  })
    .then((resp) => {
      console.log('location determined:', resp.data.results[0].geometry.location);
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
