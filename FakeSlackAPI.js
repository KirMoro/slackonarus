import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import { messages, replyMessage1, replyMessage2 } from './__fixtures__/slackData.js';

export class FakeSlackAPI {
  constructor(config) {
    this._url = config.url;
    this._token = config.token;
    this.conversation = {
      channel: null,
      oldest: null,
      latest: null,
    };
  }
  // устанавливаем диапазон сообщений с которыми мы будем работать
  // под капотом "парсим" ссылки, разбивая их на channel, oldest, latest и получится:
  //   channel=C03L9DBH708
  //   oldest=1660057772.213509
  //   latest=1660142789.914989

  setConversationRange({ firstMessageURL, lastMessageURL }) {
    const firstURL = new URL(firstMessageURL);
    const lastURL = new URL(lastMessageURL);

    const [, , channel, oldestString] = firstURL.pathname.split('/');
    const [, , , latestString] = lastURL.pathname.split('/');
    // Получаем регуляркой все числа в конце строки. Может вернуться или массив или null, поэтому есть ИЛИ.
    const [parsedOldestString] = oldestString.match(/\d+$/) || [''];
    const [parsedLatestString] = latestString.match(/\d+$/) || [''];
    // Превращаем строки в числа (моет превратиться в NaN)
    const oldestNs = parseFloat(parsedOldestString);
    const latestNs = parseFloat(parsedLatestString);
    const nanoSecondsInMilliseconds = 1000000;

    if (isNaN(oldestNs) || isNaN(latestNs) || !channel) {
      // Пусть кто-то снаружи узнает, что что-то не так. Можно возвращать объект ошибки
      return false;
    }

    const oldest = oldestNs / nanoSecondsInMilliseconds;
    const latest = oldestNs / nanoSecondsInMilliseconds;

    this.conversation = {
      channel,
      oldest,
      latest,
    };

    return true;
  }

  // GET /conversations.history получаем все сообщения
  // Обрати внимание на флаг has_more и подумай о рекурсии
  async getAllConversations() {
    return messages.messages;
  }

  // GET /conversations.replies получаем все треды
  // conversationTS - значение поля "ts" из массива "messages", который пришёл из getAllConversations()
  async getAllReplies(conversationTS) {
    if (conversationTS === replyMessage1.messages[0].thread_ts) {
      return replyMessage1.messages;
    }
    return replyMessage2.messages;
  }

  // GET /users.profile.get получаем пользователя
  // userID - значение поля "user" из массива "messages", который пришёл из getAllConversations() или getAllReplies
  async getUser(userID) {
    const user = {
      user: userID,
      display_name: faker.name.fullName(),
      image_original: faker.image.avatar(),
    };

    return user;
  }
}
