import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '30036034-49bdb558087010c436563671a';

export default function fetchImages(searchValue) {
  return fetch(
    `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
  ).then(response => {
    return response.json();
  });
}

// export default async function fetchImages(searchValue, numberPage) {
//   const response = await fetch(
//     `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${numberPage}`
//   );
//   return await response.json();
// }

// export default async function fetchImages(searchValue, numberPage) {
//   const response = await axios.get(
//     `${URL}?&q=${searchValue}`,
//     ((params = {
//       image_type: photo,
//       orientation: horizontal,
//       safesearch: true,
//       per_page: 50,
//       page: numberPage,
//     }),
//     (headers = {
//       'Content-Type': 'aplication/json',
//       Authorization: '30036034-49bdb558087010c436563671a',
//     }))
//   );
//   return await response.json();
// }
