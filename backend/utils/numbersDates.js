export const getRandomNumber = (max, min = 0) =>
  Math.floor(Math.random() * (max - min) + min);

const getCurrentDate = (dateUnit) => {
  const now = new Date();
  switch (dateUnit) {
    case "year":
      return now.getFullYear();
    case "month":
      return now.getMonth();
    case "day":
      return now.getDate();
    default:
      return now;
  }
};

export const getRandomDate = () => {
  const currentYear = getCurrentDate("year");
  const year = getRandomNumber(currentYear + 1, currentYear - 2);
  const isCurrentYear = year === currentYear;
  let month = getRandomNumber(13);
  let day = getRandomNumber(32);

  if (isCurrentYear) {
    month = getRandomNumber(getCurrentDate("month") + 1);
    day = getRandomNumber(getCurrentDate("day") + 1);
  }

  return new Date(year, month, day);
};
