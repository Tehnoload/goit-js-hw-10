import './sass/index.scss';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import axios from 'axios';
import Notiflix from 'notiflix';

const { TheCatAPI } = require('@thatapicompany/thecatapi');

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_Z7kP5XLSRBvNGWN0usCFVfx1y3cMJ0NRonNctCpVwYt1c72Vl3nih83mVxln8Slk';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
loader.style.display = 'block';
fetchBreeds()
  .then(data =>
    data.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
      loader.style.display = 'none';
    })
  )

  .catch(error => {
    Notiflix.Notify.failure(`❌ Rejected promise ${error}`);

    error.style.display = 'block';
  });

const selectedBreedId = breedSelect.value;
breedSelect.addEventListener('change', onSelect);

function onSelect() {
  const selectedBreedId = breedSelect.value;
  breedSelect.style.display = 'none';
  loader.style.display = 'block';
  catInfo.style.display = 'none';
  error.style.display = 'none';
  fetchCatByBreed(selectedBreedId)
    .then(data => {
      catInfo.innerHTML = createMarkup(data);
      breedSelect.style.display = 'block';
      loader.style.display = 'none';
      catInfo.style.display = 'flex';
    })
    .catch(error => {
      Notiflix.Notify.failure(`❌ Rejected promise ${error}`);
      loader.style.display = 'none';
      breedSelect.style.display = 'block';
      error.style.display = 'block';
    });
}

function createMarkup(data) {
  return data
    .map(
      ({ breeds, url }) =>
        `
      <img src="${url}" alt="${breeds[0].name}" class="cat-img" width=300 />
      <ul>
        <li><h2 class="breed-name">${breeds[0].name}</h2></li>
        <li><p class="description">${breeds[0].description}</p></li>
        <li>
          <p class="temperament">
            <span>Temperament:</span> ${breeds[0].temperament}
          </p>
          
        </li>
      </ul>`
    )
    .join('');
}
