const URL = 'https://pixabay.com/api/';
const API_KEY = '30036034-49bdb558087010c436563671a';

export default function fetchImages(searchValue) {
  return fetch(
    `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
  ).then(response => {
    return response.json();
  });
}
