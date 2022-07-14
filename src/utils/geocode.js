const axios = require('axios').default;

// const geocode = (address, callback) => {
//   const params = {
//     access_token:
//       'pk.eyJ1IjoiY29hc3Q5MiIsImEiOiJja3l4bHA0d3EwamthMm50N3FmdnZpdGt6In0.x_QBhqLB0YK11-ShusjzxA',
//     query: encodeURIComponent(address) + '.json',
//     limit: 1,
//   };

//   axios
//     .get('https://api.mapbox.com/geocoding/v5/mapbox.places/', params)
//     .then((response) => {
//       if (response.body.features.length === 0) {
//         callback(undefined, 'Could not find a match for your location.');
//       } else {
//         callback(undefined, {
//           latitude: response.body.features[0].center[1],
//           longitutde: response.body.features[0].center[0],
//           location: response.body.features[0].place_name,
//         });
//       }
//     })
//     .catch((error) => {
//       callback('Could not connect to Mapbox API', undefined);
//     });
// };
// const mapbox = axios.create({
//   baseURL:
//     'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
//     encodeURIComponent(address) +
//     '.json?access_token=pk.eyJ1IjoiY29hc3Q5MiIsImEiOiJja3l4bHA0d3EwamthMm50N3FmdnZpdGt6In0.x_QBhqLB0YK11-ShusjzxA&limit=1',
// });

const geocode = async (address, callback) => {
  const params = {
    access_token:
      'pk.eyJ1IjoiY29hc3Q5MiIsImEiOiJja3l4bHA0d3EwamthMm50N3FmdnZpdGt6In0.x_QBhqLB0YK11-ShusjzxA',
  };
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json`,
      {
        params,
      } 
    );
    if (data.features.length === 0) {
      callback(undefined, 'Could not find a match for your location.');
    } else {
      callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name,
      });
    }
  } catch (err) {
    callback('Could not connect to Mapbox API', undefined);
  }
};

module.exports = geocode;
