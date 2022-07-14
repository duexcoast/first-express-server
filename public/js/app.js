import axios from './axios';
console.log('The client-side javascript has loaded.');
// const axios = require('axios');
const getForecast = async () => {
  const { data } = await axios.get('http://localhost:3000/weather/', {
    query: {
      address: 'Boston',
    },
  });
  if (data.error) {
    console.log(data.error);
  } else {
    console.log(data.location);
    console.log(data.forecast);
  }
};

getForecast();
  