import { CHATS_AMOUNT, NAMES, SURNAMES } from "../constants.js";
import { BASE_URL } from "../config.js";
import { getRandomNumber } from "./numbersDates.js";

export const getRandomAvatar = () =>
  `${BASE_URL}/${getRandomNumber(CHATS_AMOUNT - 1)}.png`;

export const getRandomName = () => {
  const name = NAMES[getRandomNumber(NAMES.length)];
  const surname = SURNAMES[getRandomNumber(SURNAMES.length)];

  return [name, surname];
};

export const generateUser = (me = false, i) => {
  const user = getRandomName();
  const avatar = i < CHATS_AMOUNT ? `${BASE_URL}/${i}.png` : getRandomAvatar();

  return {
    id: crypto.randomUUID(),
    name: user[0],
    surname: user[1],
    avatar,
    you: me,
  };
};

function* generateUserInfo(amount) {
  let i = 0;

  while (i < amount) {
    yield generateUser(false, i);
    i++;
  }
}

export const generateUsers = (amount) => generateUserInfo(amount).toArray();
