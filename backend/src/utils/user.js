import { CHATS_AMOUNT, AVATARS_AMOUNT, NAMES, SURNAMES } from "../constants.js";
import { BASE_URL } from "../config.js";
import { getRandomNumber } from "./helpers.js";

export const getRandomAvatar = () =>
  `${BASE_URL}/${getRandomNumber(CHATS_AMOUNT - 1)}.png`;

export const getRandomName = () => {
  const name = NAMES[getRandomNumber(NAMES.length - 1)];
  const surname = SURNAMES[getRandomNumber(SURNAMES.length - 1)];

  return [name, surname];
};

export const generateUser = (me = false, i) => {
  const user = getRandomName();
  const avatar =
    i < AVATARS_AMOUNT ? `${BASE_URL}/${i}.png` : getRandomAvatar();

  return {
    id: crypto.randomUUID(),
    name: user[0],
    surname: user[1],
    avatar,
    you: me,
  };
};

export const generateUsers = (amount, me) => {
  let i = 0;
  const users = {};

  while (i < amount) {
    const curr = generateUser(false, i);
    users[curr.id] = curr;
    i++;
  }

  users[me.id] = me;

  return users;
};
