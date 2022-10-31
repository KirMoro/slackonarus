import { FakeSlackAPI } from './FakeSlackAPI.js';
import { card } from './card.js';

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

  messages.forEach((message) => {
    const container = document.querySelector('.list-group');

    if (message.reply_count === 0) {
      container.append(card(message, usersMap));
    } else {
      container.append(card(message, usersMap));

      const repliesLi = document.createElement('li');
      const repliesUl = document.createElement('ul');

      repliesLi.classList.add('d-flex', 'list-group-item', 'border', 'border-0', 'px-0', 'bg-transparent');
      repliesUl.classList.add('list-group', 'list-group-flush', 'ms-5');

      replies.forEach((reply) => {
        if (reply.thread_ts === message.thread_ts && reply.text !== message.text) {
          repliesUl.prepend(card(reply, usersMap));
          repliesLi.prepend(repliesUl);
          container.append(repliesLi);
        }
      });
    }
  });
};

runApp();
