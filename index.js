const apiKey = "dhEr37TqaJarfetUL6s7VkXgCvTG3sFbKOTckyyQ";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
  console.log(queryItems);
};

function getParks(state, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: state,
    limit: maxResults,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
}

function displayResults (responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
  $('#results-list').append(
    `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
    <h4>Description:</h4>
    <p>${responseJson.data[i].description}</p>
    </li>`
  )};
  $('#results').removeClass('hidden');
}

function watchForm() {
  $('body').on('click', '#submit', function(event) {
    event.preventDefault();
    const state = $('#state').val();
    const maxResults = $('#max-results').val();
    getParks(state, maxResults);
    }
  )
}

$(watchForm);
