import { FakeSlackAPI } from './FakeSlackAPI.js';
// import { DateTime } from "luxon";


const config = {
  url: 'https://slack.com/api/', // куда стучаться за данными
  token: 'some-slack-token', // с каким токеном стучаться
};

const objURL = {
  firstMessageURL: 'https://hexlet-students.slack.com/archives/C03L9DBH708/p1660057772213509',
  lastMessageURL: 'https://hexlet-students.slack.com/archives/C03L9DBH708/p1660142789914989',
};

const runApp = async () => {
  const slackAPI = new FakeSlackAPI(config);
  const usersMap = new Map([]);

  const isSetConversation = slackAPI.setConversationRange(objURL);
  if (!isSetConversation) {
    throw new Error('Ошибка установки ConversationRange');
  }

  const messages = await slackAPI.getAllConversations();
  const repliesPromises = messages
    .filter(({ reply_count }) => reply_count > 0)
    .map(({ thread_ts }) => slackAPI.getAllReplies(thread_ts));

  const replies = await Promise.all(repliesPromises)
    .then((replies) => replies.flat().reverse());

  messages.forEach((message) => {
    const { user } = message;
    usersMap.set(user, null);
  });
  replies.forEach((message) => {
    const { user } = message;
    usersMap.set(user, null);
  });

  const usersPromise = Array
    .from(usersMap.keys())
    .map((userID) => slackAPI.getUser(userID)
      .then((user) => {
        usersMap.set(userID, user);
      }));
  await Promise.all(usersPromise);

  const getTime = (messageTime) => {
    const millisecondsInSecond = 1000;
    const milliseconds = messageTime * millisecondsInSecond;

    const newDate = new Date(milliseconds);
    const minutes = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes();
    const hours = newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();

    const timeStamp = `${hours}:${minutes}`;
    return timeStamp;
  };

  const generateCard = (message, usersDataMap) => {
    const cardElement = document
      .querySelector('#card-main')
      .content
      .querySelector('.card')
      .cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardText = cardElement.querySelector('.card__text');
    const cardAvatar = cardElement.querySelector('.card__avatar');
    const cardTime = cardElement.querySelector('.card__time');

    cardTitle.textContent = usersDataMap.get(message.user).display_name;
    cardText.textContent = message.text;
    cardAvatar.src = usersDataMap.get(message.user).image_original;
    cardTime.textContent = getTime(message.ts);

    return cardElement;
  };

  messages.forEach((message) => {
    const container = document.querySelector('.card__list');

    if (message.reply_count === 0) {
      container.append(generateCard(message, usersMap));
    } else {
      container.append(generateCard(message, usersMap));

      const repliesLi = document.createElement('li');
      const repliesUl = document.createElement('ul');

      repliesLi.classList.add('d-flex', 'list-group-item', 'border', 'border-0', 'px-0', 'bg-transparent');
      repliesUl.classList.add('list-group', 'list-group-flush', 'ms-5');

      replies.forEach((reply) => {
        if (reply.thread_ts === message.thread_ts && reply.text !== message.text) {
          repliesUl.prepend(generateCard(reply, usersMap));
          repliesLi.prepend(repliesUl);
          container.append(repliesLi);
        }
      });
    }
  });
};

runApp();
