import { messages, replyMessage1, replyMessage2 } from "./slackData.js";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const config =
  {
    url: 'https://slack.com/', // куда стучаться за данными
    token: 'some-slack-token', // с каким токеном стучаться
    historyURL: 'api/conversations.history', // pathname для запроса всех сообщений
    repliesURL: 'conversations.replies', // pathname для запроса реплаев
    userURL: 'users.profile.get' // pathname для запроса юзеров
  }

const objURL = {
  firstMessageURL: 'https://hexlet-students.slack.com/archives/C03L9DBH708/p1660057772213509',
  lastMessageURL: 'https://hexlet-students.slack.com/archives/C03L9DBH708/p1660142789914989',
}

class FakeSlackAPI {
  constructor(config) {
    this._url = config.url;
    this._token = config.token;
    this._historyURL = config.historyURL;
    this._repliesURL = config.repliesURL;
    this._userURL = config.userURL;
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
// Обрати внимание на флаг has_more и подумай о рекурсии
  getAllConversations() {
    const historyURL = new URL(`${this._url}`);
    historyURL.pathname = this._historyURL;
    historyURL.searchParams.set('channel', `${this._range.channel}`);
    historyURL.searchParams.set('inclusive', `true`);
    historyURL.searchParams.set('latest', `${this._range.latest}`);
    historyURL.searchParams.set('limit', '5');
    historyURL.searchParams.set('oldest', `${this._range.oldest}`);

    return messages.messages;
  }

// GET /conversations.replies получаем все треды
// conversationTS - значение поля "ts" из массива "messages", который пришёл из getAllConversations()

  getAllReplies(conversationTS) {
    const repliesURL = new URL(`${this._url}`);
    repliesURL.pathname = this._repliesURL;
    repliesURL.searchParams.set('channel', `${this._range.channel}`);
    repliesURL.searchParams.set('ts', `${conversationTS}`);

    if (conversationTS === replyMessage1.messages[0].thread_ts) {
      return replyMessage1.messages
    } else {
      return replyMessage2.messages;
    }
  }

// GET /users.profile.get получаем пользователя
// userID - значение поля "user" из массива "messages", который пришёл из getAllConversations() или getAllReplies

  getAllUsers(userID) {
    const userURL = new URL(`${this._url}`);
    userURL.pathname = this._userURL;
    userURL.searchParams.set('user', `${userID}`);

    const user = {
      "user": userID,
      "display_name": faker.name.fullName(),
      "image_original": faker.image.avatar(),
    }

    return user;
  }
}

// Создание экземпляра класса
const fakeAPI = new FakeSlackAPI(config)

// Получение всех сообщений
function getMessages(messagesURL) {
  const parseURL = fakeAPI.setConversationRange(messagesURL); // Парсинг ссылки
  const messagesFromApi = fakeAPI.getAllConversations(parseURL); // Получение основных сообщений

  // Получение реплаев на все сообщения
  const repliesArr = [];

  messagesFromApi.forEach((item) => {
    repliesArr.push(fakeAPI.getAllReplies(item.ts))
  });

  // Удаление повторяющихся сообщений
  function filterByProperty(array, propertyName) {
    const occurrences = {}

    return array.filter((x) => {
      const property = x[propertyName]
      if (occurrences[property]) {
        return false;
      } else if
      (occurrences[property] = true)
        return true;
    })
  };

  const allRepliesArr = [].concat(repliesArr[0], repliesArr[repliesArr.length - 1]);

  const repliesMessages = []

  allRepliesArr.forEach((item) => {
    repliesMessages.push({
      'text': item.text,
      'ts': item.ts,
      'user': item.user,
      'isReply': true
    })
  })

  const allMessages = [].concat(messagesFromApi, repliesMessages);
  const filteredMessages = filterByProperty(allMessages, 'text');

  return filteredMessages;
};

function getUserInfo(messageArr) {
  const users = [];

  messageArr.forEach((item) => {
    if (users.find(user => user.user === item.user)) {
return
    } else {
      users.push(fakeAPI.getAllUsers(item.user))
    }
  });

  return users;
};

function prepaireForRender(messages, users) {
  const messagesForRender = [];

  messages.forEach((item) => {
    messagesForRender.push({
      'text': item.text,
      'ts': item.ts,
      'user': users.find(user => user.user === item.user).display_name,
      'avatar': users.find(user => user.user === item.user).image_original,
      'isReply': item.isReply
    })
  });

  return messagesForRender;
}

const allMessages = getMessages(objURL);
const users = getUserInfo(allMessages);
const messagesForRender = prepaireForRender(allMessages, users);

const runApp = (messagesData) => {
  const container = document.querySelector('.card__list');

  const generateCard = (dataCards) => {
    const cardElementMain = document
      .querySelector('#card-main')
      .content
      .querySelector('.card')
      .cloneNode(true);

    const cardTitle = cardElementMain.querySelector('.card__title');
    const cardText = cardElementMain.querySelector('.card__text');
    const cardAvatar = cardElementMain.querySelector('.card__avatar');

    cardTitle.textContent = dataCards.user;
    cardText.textContent = dataCards.text;
    cardAvatar.src = dataCards.avatar;

    if (dataCards.isReply) {
    // вставка реплая
    }

    return cardElementMain;
  };

  const renderItems = (messagesData) => {

    messagesData.forEach((card) => {
      container.prepend(generateCard(card))
    })
  }

  renderItems(messagesData)
};

runApp(messagesForRender);
