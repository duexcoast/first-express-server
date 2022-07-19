const path = require('path');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const templatesPath = path.join(__dirname, '../templates');
const viewsPath = path.join(__dirname, '../templates/views');

app.set('view engine', templatesPath);
app.set('views', viewsPath);

app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'Weather App',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send('Please provide an address');
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        address: req.query.address,
        location: data.location,
        forecast: forecastData,
      });
    });
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About',
  });
});

app.listen(3000, () => {
  
})