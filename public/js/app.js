// API call to backend '/weather' endpoint
// Renders response to the DOM
const getForecast = async (address) => {
  // axios loaded through CDN
  const { data } = await axios.get('http://localhost:3000/weather', {
    params: {
      address: address,
    },
  });
  if (data.error) {
    errorMessage.textContent = data.error;
    dataMessage.textContent = '';
  } else {
    errorMessage.textContent = '';
    dataMessage.textContent = `Location: ${data.location}, Forecast: ${data.forecast}`;
  }
};

// Selecting DOM nodes for form inputs
const searchForm = document.querySelector('.search-box');
const searchBox = document.querySelector('#search');
// Selecting DOM nodes for writing API response to the page
const errorMessage = document.querySelector('#error');
const dataMessage = document.querySelector('#data');

// Event Listener on Form, calls the getForecast 'weather' api with user input locaation
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMessage.textContent = 'Loading...';
  dataMessage.textContent = '';
  getForecast(searchBox.value);
});
