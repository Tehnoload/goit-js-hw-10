import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_Z7kP5XLSRBvNGWN0usCFVfx1y3cMJ0NRonNctCpVwYt1c72Vl3nih83mVxln8Slk';

export function fetchBreeds() {
  return fetch(
    `${axios.defaults.baseURL}/breeds?api_key=${axios.defaults.headers.common['x-api-key']}`
  )
    .then(resp => {
      if (!resp.ok) {
        Notiflix.Notify.failure(
          'Request rejected. Please enter the correct address'
        );
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .catch(error => {
      Notiflix.Notify.failure(`❌ Rejected promise ${error}`);
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${axios.defaults.baseURL}/images/search?api_key=${axios.defaults.headers.common['x-api-key']}&breed_ids=${breedId}`
  )
    .then(resp => {
      if (!resp.ok) {
        Notiflix.Notify.failure(
          'Request rejected. Please enter the correct address'
        );
        throw new Error(resp.statusText);
      }
      console.log(resp);
      const catData = resp.json();
      console.log('catData' + catData);
      return catData;
    })
    .catch(error => {
      Notiflix.Notify.failure(`❌ Rejected promise ${error}`);
    });
}
