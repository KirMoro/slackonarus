import { luxon } from './luxon.js';

const DateTime = luxon.DateTime;

export const card = (cardData, userData) => {
  const cardElement = document.createElement('li');
  cardElement.className = 'list-group-item d-flex border border-0 py-1 bg-transparent px-0';

  const cardImg = document.createElement('img');
  cardImg.className = 'rounded-circle d-flex align-self-start me-2 shadow-sm';
  cardImg.width = '40';
  cardImg.src = userData.get(cardData.user).image_original;

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card border-0 shadow-sm';

  const cardAuthorDiv = document.createElement('div');
  cardAuthorDiv.className = 'card-header d-flex justify-content-between';

  const cardAuthorTitle = document.createElement('p');
  cardAuthorTitle.className = 'fw-bold mb-0';
  cardAuthorTitle.textContent = userData.get(cardData.user).display_name;

  const cardTime = document.createElement('p');
  cardTime.className = 'text-muted small mb-0 ps-4';

  const millisecondsInSecond = 1000;
  const milliseconds = cardData.ts * millisecondsInSecond;
  cardTime.textContent = DateTime.fromMillis(milliseconds).toLocaleString(DateTime.TIME_24_SIMPLE);

  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body py-2';

  const messageArr = cardData.text.trim().split('\n');
  messageArr.forEach((message) => {
    const cardText = document.createElement('p');
    cardText.className = 'mb-0';
    cardText.textContent = message;
    cardBodyDiv.appendChild(cardText);
  });

  cardAuthorDiv.appendChild(cardAuthorTitle);
  cardAuthorDiv.appendChild(cardTime);

  cardDiv.appendChild(cardAuthorDiv);
  cardDiv.appendChild(cardBodyDiv);

  cardElement.appendChild(cardImg);
  cardElement.appendChild(cardDiv);

  return cardElement;
};
