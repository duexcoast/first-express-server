const axios = require('axios');

const forecast = async (latitude, longitude, callback) => {
  try {
    const { data } = await axios.get('http://api.weatherstack.com/current', {
      params: {
        access_key: 'da8fb35ce2dddb26d2babed624cb3b98',
        query: latitude + ',' + longitude,
        units: 'f',
      },
    });
    if (data.error) {
      callback('Unable to locate those coordinates', undefined);
    } else {
      callback(undefined, data.current.temperature);
    }
  } catch (err) {
    callback('Unable to connect to Weatherstack API', undefined);
  }
};

module.exports = forecast;
