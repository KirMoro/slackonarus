/* Получить историю чата
* https://hexlet-students.slack.com/archives/C03L9DBH708/p1660057772213509 // исходная ссылка первого сообщения
* https://hexlet-students.slack.com/archives/C03L9DBH708/p1660142789914989 // исходная ссылка последнего сообщения
*
* в адресах содержится timestamp, например: p1660057772213509 надо превратить в 1660057772.213509
*
* ссылка запроса:
* https://slack.com/api/conversations.history?channel=C03L9DBH708&inclusive=true&latest=1660142789.914989&limit=5&oldest=1660057772.213509
* составные ссылки:
* channel=C03L9DBH708&      // идентификатор чата
* oldest=1660057772.213509  // от даты
* latest=1660142789.914989  // до даты
* inclusive=true            // "от" и "до" включить в результаты
* */
export const messages = {
  "ok": true,
  "latest": "1660142789.914989",
  "oldest": "1660057772.213509",
  "messages": [
    {
      "client_msg_id": "190c09aa-108f-4522-8843-d2aa6260ce80",
      "type": "message",
      "text": "Спонтанная обратная связь перед вебинаром\n• 3 вебинара в неделю - кажется слишком часто (не успеваю посмотреть пропущенные вебинары, сделать дз)\n• Саша обещал дать обратную связь по ДЗ, но у некоторых домашек все же нет стикеров\n• Не хватает обратной связи по обратной связи, которую мы давали другим",
      "user": "U01S21HSVT5",
      "ts": "1660142789.914989",
      "team": "T019FJ8M43H",
      "blocks": [
        {
          "type": "rich_text",
          "block_id": "6nPTK",
          "elements": [
            {
              "type": "rich_text_section",
              "elements": [
                {
                  "type": "text",
                  "text": "Спонтанная обратная связь перед вебинаром\n"
                }
              ]
            },
            {
              "type": "rich_text_list",
              "elements": [
                {
                  "type": "rich_text_section",
                  "elements": [
                    {
                      "type": "text",
                      "text": "3 вебинара в неделю - кажется слишком часто (не успеваю посмотреть пропущенные вебинары, сделать дз)"
                    }
                  ]
                },
                {
                  "type": "rich_text_section",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Саша обещал дать обратную связь по ДЗ, но у некоторых домашек все же нет стикеров"
                    }
                  ]
                },
                {
                  "type": "rich_text_section",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Не хватает обратной связи по обратной связи, которую мы давали другим"
                    }
                  ]
                }
              ],
              "style": "bullet",
              "indent": 0,
              "border": 0
            }
          ]
        }
      ],
      "thread_ts": "1660142789.914989",
      "reply_count": 2,
      "reply_users_count": 2,
      "latest_reply": "1660143695.157829",
      "reply_users": [
        "U01SREZGA85",
        "U02S6DDGS2D"
      ],
      "is_locked": false,
      "subscribed": false,
      "reactions": [
        {
          "name": "heavy_plus_sign",
          "users": [
            "U02G0K2EH42",
            "U01SREZGA85",
            "U02FBJ6TCEL",
            "U02RJET7Z9Q"
          ],
          "count": 4
        },
        {
          "name": "pepelove",
          "users": [
            "U03P0LLFM7C"
          ],
          "count": 1
        }
      ]
    },
    {
      "client_msg_id": "254752f1-3758-4106-be29-3c22573eb49b",
      "type": "message",
      "text": "Всем привет :wave:\n\nМы на вебинарах как-то разбирали момент списывания в теории. А если вы действительно видите, что человек списал, что делаете в таком случае на самом деле? :acid_smile:\n\nКак вы начинаете диалог по этому поводу и начинаете ли вообще?",
      "user": "U02HPJG2F6Z",
      "ts": "1660057772.213509",
      "team": "T019FJ8M43H",
      "blocks": [
        {
          "type": "rich_text",
          "block_id": "Zx7",
          "elements": [
            {
              "type": "rich_text_section",
              "elements": [
                {
                  "type": "text",
                  "text": "Всем привет "
                },
                {
                  "type": "emoji",
                  "name": "wave",
                  "unicode": "1f44b"
                },
                {
                  "type": "text",
                  "text": "\n\nМы на вебинарах как-то разбирали момент списывания в теории. А если вы действительно видите, что человек списал, что делаете в таком случае на самом деле? "
                },
                {
                  "type": "emoji",
                  "name": "acid_smile"
                },
                {
                  "type": "text",
                  "text": "\n\nКак вы начинаете диалог по этому поводу и начинаете ли вообще?"
                }
              ]
            }
          ]
        }
      ],
      "thread_ts": "1660057772.213509",
      "reply_count": 1,
      "reply_users_count": 1,
      "latest_reply": "1660147859.655069",
      "reply_users": [
        "U01SREZGA85"
      ],
      "is_locked": false,
      "subscribed": false
    }
  ],
  "has_more": false,
  "is_limited": true,
  "pin_count": 0,
  "channel_actions_ts": null,
  "channel_actions_count": 0
};

/*
* треды в сообщении p1660142789914989
* https://slack.com/api/conversations.replies?channel=C03L9DBH708&ts=1660142789.914989
* */
export const replyMessage1 = {
  "ok": true,
  "messages": [
    {
      "client_msg_id": "190c09aa-108f-4522-8843-d2aa6260ce80",
      "type": "message",
      "text": "Спонтанная обратная связь перед вебинаром\n• 3 вебинара в неделю - кажется слишком часто (не успеваю посмотреть пропущенные вебинары, сделать дз)\n• Саша обещал дать обратную связь по ДЗ, но у некоторых домашек все же нет стикеров\n• Не хватает обратной связи по обратной связи, которую мы давали другим",
      "user": "U01S21HSVT5",
      "ts": "1660142789.914989",
      "team": "T019FJ8M43H",
      "blocks": [
        {
          "type": "rich_text",
          "block_id": "6nPTK",
          "elements": [
            {
              "type": "rich_text_section",
              "elements": [
                {
                  "type": "text",
                  "text": "Спонтанная обратная связь перед вебинаром\n"
                }
              ]
            },
            {
              "type": "rich_text_list",
              "elements": [
                {
                  "type": "rich_text_section",
                  "elements": [
                    {
                      "type": "text",
                      "text": "3 вебинара в неделю - кажется слишком часто (не успеваю посмотреть пропущенные вебинары, сделать дз)"
                    }
                  ]
                },
                {
                  "type": "rich_text_section",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Саша обещал дать обратную связь по ДЗ, но у некоторых домашек все же нет стикеров"
                    }
                  ]
                },
                {
                  "type": "rich_text_section",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Не хватает обратной связи по обратной связи, которую мы давали другим"
                    }
                  ]
                }
              ],
              "style": "bullet",
              "indent": 0,
              "border": 0
            }
          ]
        }
      ],
      "thread_ts": "1660142789.914989",
      "reply_count": 2,
      "reply_users_count": 2,
      "latest_reply": "1660143695.157829",
      "reply_users": [
        "U01SREZGA85",
        "U02S6DDGS2D"
      ],
      "is_locked": false,
      "subscribed": false,
      "reactions": [
        {
          "name": "heavy_plus_sign",
          "users": [
            "U02G0K2EH42",
            "U01SREZGA85",
            "U02FBJ6TCEL",
            "U02RJET7Z9Q"
          ],
          "count": 4
        },
        {
          "name": "pepelove",
          "users": [
            "U03P0LLFM7C"
          ],
          "count": 1
        }
      ]
    },
    {
      "client_msg_id": "1ffcaa95-083e-430c-a4f8-3cd680c34fe0",
      "type": "message",
      "text": "да аналогично, я хоть успеваю на все вебинары, но все равно слишком плотный график, тяжело через день по 2ч, 3 раза в неделю + домашки",
      "user": "U01SREZGA85",
      "ts": "1660142903.771079",
      "team": "T019FJ8M43H",
      "edited": {
        "user": "U01SREZGA85",
        "ts": "1660142918.000000"
      },
      "blocks": [
        {
          "type": "rich_text",
          "block_id": "BV8",
          "elements": [
            {
              "type": "rich_text_section",
              "elements": [
                {
                  "type": "text",
                  "text": "да аналогично, я хоть успеваю на все вебинары, но все равно слишком плотный график, тяжело через день по 2ч, 3 раза в неделю + домашки"
                }
              ]
            }
          ]
        }
      ],
      "thread_ts": "1660142789.914989",
      "parent_user_id": "U01S21HSVT5"
    },
    {
      "client_msg_id": "6562f515-4db0-46b3-92c5-662c204cbc1e",
      "type": "message",
      "text": "Ребят, спасибо за ОС! :+1:",
      "user": "U02S6DDGS2D",
      "ts": "1660143695.157829",
      "team": "T019FJ8M43H",
      "blocks": [
        {
          "type": "rich_text",
          "block_id": "i+V",
          "elements": [
            {
              "type": "rich_text_section",
              "elements": [
                {
                  "type": "text",
                  "text": "Ребят, спасибо за ОС! "
                },
                {
                  "type": "emoji",
                  "name": "+1",
                  "unicode": "1f44d"
                }
              ]
            }
          ]
        }
      ],
      "thread_ts": "1660142789.914989",
      "parent_user_id": "U01S21HSVT5"
    }
  ],
  "has_more": false
};

/*
* треды в сообщении p1660057772213509
* https://slack.com/api/conversations.replies?channel=C03L9DBH708&ts=1660057772.213509
* */
export const replyMessage2 = {
  "ok": true,
  "messages": [
    {
      "client_msg_id": "254752f1-3758-4106-be29-3c22573eb49b",
      "type": "message",
      "text": "Всем привет :wave:\n\nМы на вебинарах как-то разбирали момент списывания в теории. А если вы действительно видите, что человек списал, что делаете в таком случае на самом деле? :acid_smile:\n\nКак вы начинаете диалог по этому поводу и начинаете ли вообще?",
      "user": "U02HPJG2F6Z",
      "ts": "1660057772.213509",
      "team": "T019FJ8M43H",
      "blocks": [
        {
          "type": "rich_text",
          "block_id": "Zx7",
          "elements": [
            {
              "type": "rich_text_section",
              "elements": [
                {
                  "type": "text",
                  "text": "Всем привет "
                },
                {
                  "type": "emoji",
                  "name": "wave",
                  "unicode": "1f44b"
                },
                {
                  "type": "text",
                  "text": "\n\nМы на вебинарах как-то разбирали момент списывания в теории. А если вы действительно видите, что человек списал, что делаете в таком случае на самом деле? "
                },
                {
                  "type": "emoji",
                  "name": "acid_smile"
                },
                {
                  "type": "text",
                  "text": "\n\nКак вы начинаете диалог по этому поводу и начинаете ли вообще?"
                }
              ]
            }
          ]
        }
      ],
      "thread_ts": "1660057772.213509",
      "reply_count": 1,
      "reply_users_count": 1,
      "latest_reply": "1660147859.655069",
      "reply_users": [
        "U01SREZGA85"
      ],
      "is_locked": false,
      "subscribed": false
    },
    {
      "client_msg_id": "10229b84-fd1d-424a-b215-2dcb5af5f268",
      "type": "message",
      "text": "Зависит же от характера общения, если они доверительные, можно просто спросить, списывал ли?\n\nУ меня в практике такое было и студенты сразу признавались. Я просто объяснил последствия и как решить их.",
      "user": "U01SREZGA85",
      "ts": "1660147859.655069",
      "team": "T019FJ8M43H",
      "blocks": [
        {
          "type": "rich_text",
          "block_id": "v8G9n",
          "elements": [
            {
              "type": "rich_text_section",
              "elements": [
                {
                  "type": "text",
                  "text": "Зависит же от характера общения, если они доверительные, можно просто спросить, списывал ли?\n\nУ меня в практике такое было и студенты сразу признавались. Я просто объяснил последствия и как решить их."
                }
              ]
            }
          ]
        }
      ],
      "thread_ts": "1660057772.213509",
      "parent_user_id": "U02HPJG2F6Z"
    }
  ],
  "has_more": false
};

/*
* данные пользователя U01S21HSVT5
* https://slack.com/api/users.profile.get?user=U01S21HSVT5
* */
export const userProfile = {
  "ok": true,
  "profile": {
    "phone": "",
    "skype": "",
    "real_name": "Nikolay Gagarinov",
    "real_name_normalized": "Nikolay Gagarinov",
    "display_name": "Nikolay Gagarinov",
    "display_name_normalized": "Nikolay Gagarinov",
    "fields": {},
    "status_text": "",
    "status_emoji": "",
    "status_emoji_display_info": [],
    "status_expiration": 0,
    "avatar_hash": "4c5e99197cc8",
    "image_original": "https://avatars.slack-edge.com/2021-03-22/1882760576453_4c5e99197cc8c9dc1756_original.png",
    "is_custom_image": true,
    "huddle_state": "default_unset",
    "huddle_state_expiration_ts": 0,
    "first_name": "Nikolay",
    "last_name": "Gagarinov",
    "image_24": "https://avatars.slack-edge.com/2021-03-22/1882760576453_4c5e99197cc8c9dc1756_24.png",
    "image_32": "https://avatars.slack-edge.com/2021-03-22/1882760576453_4c5e99197cc8c9dc1756_32.png",
    "image_48": "https://avatars.slack-edge.com/2021-03-22/1882760576453_4c5e99197cc8c9dc1756_48.png",
    "image_72": "https://avatars.slack-edge.com/2021-03-22/1882760576453_4c5e99197cc8c9dc1756_72.png",
    "image_192": "https://avatars.slack-edge.com/2021-03-22/1882760576453_4c5e99197cc8c9dc1756_192.png",
    "image_512": "https://avatars.slack-edge.com/2021-03-22/1882760576453_4c5e99197cc8c9dc1756_512.png",
    "image_1024": "https://avatars.slack-edge.com/2021-03-22/1882760576453_4c5e99197cc8c9dc1756_1024.png",
    "status_text_canonical": ""
  }
};
