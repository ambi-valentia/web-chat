import { LOREM } from "../constants.js";
import { me } from "../server.js";
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
  const firstCreatedAt = getRandomDate();

  while (i < amount) {
    const createdAt =
      i === 0
        ? firstCreatedAt.getTime()
        : Date.now() - getRandomNumber(1200000, 120000);
    yield {
      id: "m" + Math.random(),
      created_at: createdAt,
      user: getRandomBoolean() ? user : me,
      message: getRandomMessage(),
      is_new:
        new Date(createdAt).getDay() === new Date().getDay() ? true : false,
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

const getRandomBoolean = () => Math.random() > 0.5;
