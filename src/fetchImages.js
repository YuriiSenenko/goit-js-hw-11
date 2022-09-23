import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '30036034-49bdb558087010c436563671a';
const perPage = 40;

export default async function fetchImages(searchValue, numberPage) {
  try {
    const response = await axios.get(
      `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${numberPage}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
