import { NAMES, SURNAMES } from "./constants.js";
import { BASE_URL } from "./config.js";

const getRandomNumber = (max, min = 0) =>
  Math.floor(Math.random() * (max - min) + min);

const getRandomName = () => {
  const name = NAMES[getRandomNumber(NAMES.length)];
  const surname = SURNAMES[getRandomNumber(SURNAMES.length)];

  return name + " " + surname;
};

const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () => new Date().getMonth();
const getCurrentDay = () => new Date().getDate();

const getRandomDate = () => {
  const currentYear = getCurrentYear();
  const year = getRandomNumber(currentYear + 1, currentYear - 2);
  const isCurrentYear = year === currentYear;
  let month = getRandomNumber(13);
  let day = getRandomNumber(32);

  if (isCurrentYear) {
    month = getRandomNumber(getCurrentMonth() + 1);
    day = getRandomNumber(getCurrentDay() + 1);
  }

  return new Date(year, month, day).getTime();
};

function* generateChatInfo(amount) {
  let i = 0;

  while (i < amount) {
    yield {
      id: crypto.randomUUID(),
      title: getRandomName(),
      created_at: getRandomDate(),
      private: true,
      count_unread: true,
      avatar: `${BASE_URL}/${i < 24 ? i : getRandomNumber(24)}.png`,
      last_message: {
        created_at: getRandomDate(),
        message:
          "It was great hanging out last week at the beach house. Thank you so mush! The more you know. Second line of the message",
      },
      users: [],
    };
    i++;
  }
}

export const generateChats = (amount) => generateChatInfo(amount).toArray();
