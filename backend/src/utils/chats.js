import { generateUser, getRandomText } from "./index.js";
import {
  getRandomBoolean,
  getRandomNumber,
  getRandomTimestamp,
  getRecentTimestamp,
} from "./helpers.js";
import { CHATS_AMOUNT } from "../constants.js";

function* generateChatInfo(amount, users, me) {
  let i = 0;

  while (i < amount) {
    const user = users[i] ?? generateUser();
    const lastMessageSender = getRandomBoolean() ? user.id : me.id;

    yield {
      id: crypto.randomUUID(),
      title: user.name + " " + user.surname,
      created_at: getRandomTimestamp(),
      private: true,
      count_unread: lastMessageSender === me.id ? 0 : getRandomNumber(1, 7),
      avatar: user.avatar,
      last_message: {
        created_at:
          Math.random() < 0.7 ? getRecentTimestamp() : getRandomTimestamp(),
        message: getRandomText(),
        user: lastMessageSender,
      },
      users: [me, user],
    };
    i++;
  }
}

export const generateChats = (users, me) => {
  const chats = {};
  const chatsToUsersMap = {};
  const usersArr = Object.values(users);
  const chatInfo = generateChatInfo(
    usersArr.length ?? CHATS_AMOUNT,
    usersArr,
    me,
  );

  for (let i = 0; i < usersArr.length ?? CHATS_AMOUNT; i++) {
    const curr = chatInfo.next().value;
    chats[curr.id] = curr;
    if (curr.private) chatsToUsersMap[curr.id] = curr.users[1];
  }

  return { chats, chatsToUsersMap };
};
