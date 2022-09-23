const URL = 'https://pixabay.com/api/';
const API_KEY = '30036034-49bdb558087010c436563671a';
const perPage = 40;

export default async function fetchImages(searchValue, numberPage) {
  const response = await fetch(
    `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${numberPage}`
  );
  return await response.json();
}
