import { LOREM } from "../constants.js";
import { me, users } from "../server.js";
import {
  getRandomBoolean,
  getRandomNumber,
  getRandomTimestamp,
  getRandomTimestampsAsc,
} from "./helpers.js";

const getRandomSentence = () => LOREM[getRandomNumber(LOREM.length - 1)];

export const getRandomText = () => {
  let i = 0;
  const text = [];

  while (i < getRandomNumber(1, 4)) {
    text.push(getRandomSentence());
    i++;
  }

  return text.join(" ");
};

const getRandomMessage = ({ createdAt, message, sender, isNew }) => ({
  id: "m" + Math.random(),
  created_at: createdAt ?? getRandomTimestamp(),
  user: sender,
  message: message ?? getRandomText(),
  is_new: isNew,
});

export const generateUserMessages = ({
  amount,
  user,
  lastMessage,
  unreadCount,
}) => {
  let i = 1;
  const userMessages = [];
  const firstMessageTimestamp = getRandomTimestamp(
    lastMessage.created_at - 14 * 24 * 60 * 60 * 1000,
    lastMessage.created_at,
  );
  const firstMessageSender = getRandomBoolean() ? user : me;
  const areAllUnread = unreadCount === amount;

  userMessages.push(
    getRandomMessage({
      createdAt: firstMessageTimestamp,
      sender: areAllUnread ? user : firstMessageSender,
      isNew: areAllUnread ? true : firstMessageSender === me ? false : true,
    }),
  );

  const timestamps = getRandomTimestampsAsc(
    firstMessageTimestamp + getRandomNumber(1, 20) * 60 * 60 * 1000,
    lastMessage.created_at - getRandomNumber(1, 30) * 60 * 60 * 1000,
    amount - 2, // amount - first and last
  );

  while (i < amount - 1) {
    const isNew = i >= amount - unreadCount;
    const randomSender = getRandomBoolean() ? user : me;

    const message = getRandomMessage({
      createdAt: timestamps[i - 1],
      sender: isNew ? user : randomSender,
      isNew,
    });

    userMessages.push(message);

    i++;
  }

  userMessages.push(
    getRandomMessage({
      createdAt: lastMessage.created_at,
      message: lastMessage.message,
      sender: users[lastMessage.user],
      isNew: amount <= unreadCount,
    }),
  );

  return userMessages;
};
