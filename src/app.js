const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

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

//
app.get('', (req, res) => {
  res.render('index.hbs', {
    title: 'Weather App',
    name: 'Conor Ney',
  });
});
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address',
    });
  }
  res.send({
    forecast: "too hot",
    location: "New York",
    address: req.query.address,
  });
});
app.get('/help', (req, res) => {
  res.render('help.hbs', {
    title: 'Help',
    message: 'I need somebody!',
  });
});
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

app.get('*', (req, res) => {
  res.render('404.hbs', {
    title: 'Weather App',
    error: "Could not find the page you're looking for",
  });
});

// Activate Server
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
