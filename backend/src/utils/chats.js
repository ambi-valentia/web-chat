import { getRandomName, getRandomAvatar, generateUser } from "./index.js";
import { getRandomDate } from "./numbersDates.js";
import { CHATS_AMOUNT } from "../constants.js";

function* generateChatInfo(amount, users, me, userMessages) {
  let i = 0;

  while (i < amount) {
    const currentUserMessages = userMessages.get(users[i].id);
    const lastUserMessage = currentUserMessages[currentUserMessages.length - 1];

    yield {
      id: crypto.randomUUID(),
      title: users
        ? users[i].name + " " + users[i].surname
        : getRandomName().join(" "),
      created_at: getRandomDate().getTime(),
      private: true,
      count_unread: true,
      avatar: users[i].avatar ?? getRandomAvatar(),
      last_message: {
        created_at: lastUserMessage.created_at,
        message: lastUserMessage.message,
      },
      users: [users ? users[i] : generateUser(), me],
    };
    i++;
  }
}

export const generateChats = (users, me, userMessages) => {
  const chats = {};
  const chatInfo = generateChatInfo(
    users.length ?? CHATS_AMOUNT,
    users,
    me,
    userMessages,
  );

  for (let i = 0; i < users.length ?? CHATS_AMOUNT; i++) {
    const curr = chatInfo.next().value;
    chats[curr.id] = curr;
  }

  return chats;
};

export const getChatToUsersMap = (chats, userMessages) => {
  const chatToUsers = {};
  Object.values(chats).forEach(
    (chat) => (chatToUsers[chat.id] = userMessages.get(chat.users[0]?.id)),
  );
  return chatToUsers;
};
