const axios = require('axios');

//const key = process.env.GEOCODE_API_KEY;



// geocoding
const getLocation = (req, res) => {
  const { address } = req.query;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      key,
      address,
    },
  })
    .then((resp) => res.send(resp.data))
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
    .then((resp) => res.send(resp.data))
    .catch(() => res.sendStatus(400));
};

module.exports = {
  getLocation,
  getAddress,
};

// key=${key}&latlng=${lat},${lng}`