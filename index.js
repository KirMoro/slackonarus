import { messages, replyMessage1, replyMessage2, userProfile } from "./slackData.js";

const messagesArray = messages.messages;
const userData = userProfile.profile;
const config =
{
  url: 'https://slack.com/api', // куда стучаться за данными
  token: 'some-slack-token', // с каким токеном стучаться
}

class FakeSlackAPI {
  constructor(config) {
    this._url = config.url;
    this._token = config.token;
  }

  // устанавливаем диапазон сообщений с которыми мы будем работать
  // под капотом "парсим" ссылки, разбивая их на channel, oldest, latest и получится:
//   channel=C03L9DBH708
//   oldest=1660057772.213509
//   latest=1660142789.914989
  setConversationRange(data) {

    const firstURL = new URL(data.firstMessageURL);
    const lastURL = new URL(data.lastMessageURL);

    const [, , channel, oldestString] = firstURL.pathname.split('/');
    const [, , , latestString] = lastURL.pathname.split('/');

    const nanoSecondsInMilliseconds = 1000000;

    this._range = {};
    this._range.channel = channel;
    this._range.oldest = oldestString.replace(/^p/,'') / nanoSecondsInMilliseconds;
    this._range.latest = latestString.replace(/^p/,'') / nanoSecondsInMilliseconds;
  }

// GET /conversations.history получаем все сообщения
  getAllConversations() {
    const historyURL = new URL(`${this._url}`);
    historyURL.pathname = 'api/conversations.history';
    historyURL.searchParams.set('channel', `${this._range.channel}`);
    historyURL.searchParams.set('inclusive', `true`);
    historyURL.searchParams.set('latest', `${this._range.latest}`);
    historyURL.searchParams.set('limit', '5');
    historyURL.searchParams.set('oldest', `${this._range.oldest}`);

    console.log(historyURL.href)

    return messages;
  }
// Обрати внимание на флаг has_more и подумай о рекурсии


// GET /conversations.replies получаем все треды
  getAllReplies(conversationTS) {
    const repliesURL = `${this._url}/conversations.replies?channel=${this._range.channel}&ts=${conversationTS}`;
  }
// conversationTS - значение поля "ts" из массива "messages", который пришёл из getAllConversations()


// GET /users.profile.get получаем пользователя
  getAllUsers(userID) {
    const userURL = `${this._url}/users.profile.get?user=${userID}`;
    return userProfile;
  }
// userID - значение поля "user" из массива "messages", который пришёл из getAllConversations() или getAllReplies

}

const objURL = {
  firstMessageURL: 'https://hexlet-students.slack.com/archives/C03L9DBH708/p1660057772213509',
    lastMessageURL: 'https://hexlet-students.slack.com/archives/C03L9DBH708/p1660142789914989',
}

const fakeAPI = new FakeSlackAPI(config)
const parseURL = fakeAPI.setConversationRange(objURL);
const messagesFromApi = fakeAPI.getAllConversations(parseURL);

messagesFromApi.messages.forEach((item) => {
  fakeAPI.getAllReplies(parseURL, item.ts);
  fakeAPI.getAllUsers(item.user)
})



//
// class FakeApi {
//   constructor(userData, messageData) {
//     this._userName = userData.display_name;
//     this._userAvatar = userData.image_original;
//     this._messages = messageData.messages;
//   }
//
//   getUserInfo(id) {
//     const userInfo = {};
//     userInfo.name = this._userName;
//     userInfo.avatar = this._userAvatar;
//     userInfo.id = id;
//     return userInfo
//   }
//
//   getMessageInfo() {
//     return this._messages.map(
//       ({ user, text, reply_count, reply_users}) => ({ user, text, reply_count, reply_users })
//     );
//
//   }
// }
//
// const api = new FakeApi(userData, messages)
//
// const initialPromises = Promise.all([
//   api.getMessageInfo()
// ]);
//
// initialPromises
//   .then(([messagesData]) => runApp(messagesData))
//   .catch((err) => {
//     console.log(err);
//   });
//
// const runApp = (messagesData) => {
//   const container = document.querySelector('.card__list');
//
//   const generateCard = (dataCards) => {
//     const cardElementMain = document
//       .querySelector('#card-main')
//       .content
//       .querySelector('.card')
//       .cloneNode(true);
//
//     const cardElementInsert = document
//       .querySelector('#card-insert')
//       .content
//       .querySelector('.card')
//       .cloneNode(true);
//
//     const cardTitle = cardElementMain.querySelector('.card__title');
//     const cardText = cardElementMain.querySelector('.card__text');
//     const cardAvatar = cardElementMain.querySelector('.card__avatar');
//
//     cardTitle.textContent = dataCards.name;
//     cardText.textContent = dataCards.text;
//     cardAvatar.src = dataCards.avatar;
//
//     return cardElementMain;
//   }
//
//   const renderItems = (dataCards) => {
//     container.prepend(generateCard(dataCards))
//     // dataCards.forEach((item) => {
//     //   container.prepend(generateCard(item));
//     // });
//   }
//
//   const createMessageInfo = (messagesData) => {
//     messagesData.forEach((message) => {
//       const messageForPublish = api.getUserInfo(message.user);
//       messageForPublish.text = message.text;
//       renderItems(messageForPublish);
//     })
//   }
//
//   createMessageInfo(messagesData)
//
// }


