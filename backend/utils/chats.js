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

export const generateChats = (users, me, userMessages) =>
  generateChatInfo(
    users.length ?? CHATS_AMOUNT,
    users,
    me,
    userMessages,
  ).toArray();

export const getChatToUsersMap = (chats) => {
  const chatToUsers = {};
  chats.forEach((chat) => (chatToUsers[chat.id] = chat.users));
  return chatToUsers;
};
