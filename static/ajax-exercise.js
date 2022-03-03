'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {

  fetch('/fortune')
    .then(response => response.text())
    .then(content => document.querySelector('#fortune-text').innerHTML = content);

}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json'
  const zipcode = document.querySelector('#zipcode-field').value;
  
  
  fetch(`${url}?zipcode=${zipcode}`)
    .then(response => response.json())
    .then(jsonData => {
      document.querySelector('#weather-info').innerHTML = jsonData.forecast;
    });
    
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const orderObject = {
    'type': document.querySelector('#melon-type-field').value,
    'qty': document.querySelector('#qty-field').value
  }

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(orderObject),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then (orderData => {
      document.querySelector('#order-status').innerHTML = orderData.msg;
      //show the msg text (orderData.msg) in #order-status div
      if (orderData.code === 'ERROR') {
        document.querySelector('#order-status')
        .classList.add('order-error');
      }
    });
  
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


const button = document.querySelector('#get-dog-image');

button.addEventListener('click', () => {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(dogdict => {
      const imageUrl = dogdict.message;
      document.querySelector('#dog-image').insertAdjacentHTML('beforeend', `<div><img src=${imageUrl}></div>`);
  });
});
