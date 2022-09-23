const URL = 'https://pixabay.com/api/';
const API_KEY = '30036034-49bdb558087010c436563671a';
const perPage = 40;

export default function fetchImages(searchValue, numberPage) {
  return fetch(
    `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${numberPage}`
  ).then(response => {
    return response.json();
  });
}
