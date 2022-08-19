import { messages, replyMessage1, userProfile } from "./slackData.js";

const messagesArray = messages.messages;
const container = document.querySelector('.card__list');
const userData = userProfile.profile;

const generateCard = (dataCards, dataUser) => {
  const cardElementMain = document
    .querySelector('#card-main')
    .content
    .querySelector('.card')
    .cloneNode(true);

  const cardElementInsert = document
    .querySelector('#card-insert')
    .content
    .querySelector('.card')
    .cloneNode(true);

  const cardTitle = cardElementMain.querySelector('.card-title');
  const cardText = cardElementMain.querySelector('.card-text');
  const cardAvatar = cardElementMain.querySelector('.card-avatar');

  cardTitle.textContent = dataCards.user;
  cardText.textContent = dataCards.text;
  cardAvatar.src = dataUser.image_original;

  return cardElementMain;
}

const renderItems = (dataCards, userData) => {
  dataCards.forEach((item) => {
    container.prepend(generateCard(item, userData));
  });
}

renderItems(messagesArray, userData)
