export const getRandomNumber = (max, min = 0) =>
  Math.floor(Math.random() * (max - min) + min);

const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () => new Date().getMonth();
const getCurrentDay = () => new Date().getDate();

export const getRandomDate = () => {
  const currentYear = getCurrentYear();
  const year = getRandomNumber(currentYear + 1, currentYear - 2);
  const isCurrentYear = year === currentYear;
  let month = getRandomNumber(13);
  let day = getRandomNumber(32);

  if (isCurrentYear) {
    month = getRandomNumber(getCurrentMonth() + 1);
    day = getRandomNumber(getCurrentDay() + 1);
  }

  return new Date(year, month, day);
};
