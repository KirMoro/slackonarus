import { messages, replyMessage1, userProfile } from "./slackData.js";

const messagesArray = messages.messages;
const userData = userProfile.profile;

class FakeApi {
  constructor(userData, messageData) {
    this._userName = userData.display_name;
    this._userAvatar = userData.image_original;
    this._messages = messages.messages;
  }

  getUserInfo(id) {
    const userInfo = {};
    userInfo.name = this._userName;
    userInfo.avatar = this._userAvatar;
    userInfo.id = id;
    return userInfo
  }

  getMessageInfo() {
    return this._messages.map(
      ({ user, text , reply_users}) => ({ user, text, reply_users })
    );

  }
}

const api = new FakeApi(userData, messages)

const initialPromises = Promise.all([
  api.getMessageInfo()
]);

initialPromises
  .then(([messagesData]) => runApp(messagesData))
  .catch((err) => {
    console.log(err);
  });

const runApp = (messagesData) => {
  const container = document.querySelector('.card__list');

  const generateCard = (dataCards) => {
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

    const cardTitle = cardElementMain.querySelector('.card__title');
    const cardText = cardElementMain.querySelector('.card__text');
    const cardAvatar = cardElementMain.querySelector('.card__avatar');

    cardTitle.textContent = dataCards.name;
    cardText.textContent = dataCards.text;
    cardAvatar.src = dataCards.avatar;

    return cardElementMain;
  }

  const renderItems = (dataCards) => {
    container.prepend(generateCard(dataCards))
    // dataCards.forEach((item) => {
    //   container.prepend(generateCard(item));
    // });
  }

  const createMessageInfo = (messagesData) => {

    messagesData.forEach((message) => {
      const messageForPublish = api.getUserInfo(message.user);
      messageForPublish.text = message.text;
      renderItems(messageForPublish);
    })
  }

  createMessageInfo(messagesData)

}


