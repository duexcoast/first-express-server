const path = require('path');

const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/help', (req, res) => {
  res.send([
    {
      age: 29,
      name: 'Conor',
    },
    {
      age: 26,
      name: 'Dana',
    },
  ]);
});
app.get('/about', (req, res) => {
  res.send('About');
});
app.get('/weather', (req, res) => {
  res.send('Weather');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
