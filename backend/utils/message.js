import { LOREM } from "../constants.js";
import { getRandomNumber, getRandomDate } from "./numbersDates.js";

const getRandomSentence = () => LOREM[getRandomNumber(LOREM.length)];

const getRandomMessage = () => {
  let i = 0;
  const message = [];

  while (i < getRandomNumber(4, 1)) {
    message.push(getRandomSentence());
    i++;
  }

  return message.join(" ");
};

function* generateMessageInfo(amount, user) {
  let i = 0;

  while (i < amount) {
    const createdAt = getRandomDate();
    yield {
      id: crypto.randomUUID(),
      created_at: createdAt.getTime(),
      user,
      message: getRandomMessage(),
      is_new: createdAt.getDay() === new Date().getDay() ? true : false,
    };
    i++;
  }
}

const generateMessages = (user) =>
  generateMessageInfo(getRandomNumber(10, 1), user).toArray();

export const generateUserMessages = (users) => {
  const userMessages = new Map();
  users.forEach((user) => userMessages.set(user.id, generateMessages(user)));

  return userMessages;
};
