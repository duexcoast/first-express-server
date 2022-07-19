const getForecast = async (address) => {
  // axios loaded through CDN
  const { data } = await axios.get('http://localhost:3000/weather', {
    params: {
      address: address,
    },
  });
  if (data.error) {
    console.log(data.error);
  } else {
    console.log(data.location);
    console.log(data.forecast);
  }
};

const searchForm = document.querySelector('.search-box');
const searchBox = document.querySelector('#search');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(searchBox.value);
  getForecast(searchBox.value);
});
