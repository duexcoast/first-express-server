const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view enginge', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Index page rendered via handlebars. 
app.get('', (req, res) => {
  res.render('index.hbs', {
    title: 'Weather App',
    name: 'Conor Ney',
  });
});

// Products API Endpoint
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  // Send an HTTP response with the products array. 
  res.send({
    products: [],
  });
});

// WEATHER API ENDPOINT
app.get('/weather', (req, res) => {
  // Checks for presence of "address" URL Query, returns error if not present
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address',
    });
  }
  // call to geocode util function, feeding it the address query and a callback function.
  // the callback function accepts two arguments, and allows us to deal with the data we receive back
  // in a very portable way across our entire app.
  geocode(req.query.address, (error, data) => {
    // error here means we can't connect to the mapbox api
    // we send a response with our error message.
    if (error) {
      return res.send({
        error: error,
      });
    }
    // OTHERWISE, if we do receive data back, we feed that data to our forecast util function.
    // This function has the same format. Three args, with the last one being a callback function with
    // standard (error, data) args.   
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      // error here means we can't connect to the weatherstack api
      // we send a response with our error message.
      if (error) {
        return res.send({
          error: error,
        });
      }
      // in the event we receive data back we then send a response object to the client. 
      return res.send({
        address: req.query.address,
        location: data.location,
        forecast: forecastData,
      });
    });
  });
});

// Help 
app.get('/help', (req, res) => {
  res.render('help.hbs', {
    title: 'Help',
    message: 'I need somebody!',
  });
});

// 404 Errors under the `/help/` route. We deliver the same 404 page but give the template 
// a more specific error message.
app.get('/help/*', (req, res) => {
  res.render('404.hbs', {
    error: "Hmm... It seems we can't help you",
    logosrc: '../img/batman.png',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About',
    name: 'Conor Ney',
  });
});

// 404 Error handling. Delivering 404.hbs to all pages that haven't been matched prior to this.
// It's crucial to keep this at the bottom of the routes, otherwise anything beneath it will not
// get matched and served, because this `/*` route will be matched first. 
app.get('*', (req, res) => {
  res.render('404.hbs', {
    title: 'Weather App',
    error: "Could not find the page you're looking for",
  });
});

// Activate Server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
