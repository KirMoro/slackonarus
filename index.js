import { FakeSlackAPI } from './FakeSlackAPI.js';

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
    throw new Error('Ошибка установки tConversationRange');
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

  const generateCard = (message, usersDataMap) => {
    const cardElement = document
      .querySelector('#card-main')
      .content
      .querySelector('.card')
      .cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardText = cardElement.querySelector('.card__text');
    const cardAvatar = cardElement.querySelector('.card__avatar');

    cardTitle.textContent = usersDataMap.get(message.user).display_name;
    cardText.textContent = message.text;
    cardAvatar.src = usersDataMap.get(message.user).image_original;

    return cardElement;
  };

  messages.forEach((message) => {
    const container = document.querySelector('.card__list');

    if (message.reply_count === 0) {
      container.append(generateCard(message, usersMap));
    } else {
      container.append(generateCard(message, usersMap));

      const repliesUl = document.createElement('ul');

      replies.forEach((replie) => {
        if (replie.thread_ts === message.thread_ts && replie.text !== message.text) {
          repliesUl.prepend(generateCard(replie, usersMap));
          container.append(repliesUl);
        }
      });
    }
  });
};

runApp();
