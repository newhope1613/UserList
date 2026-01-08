export const forrmattedData = () => {
  const date = new Date(Date.now());
  const formateDate = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formateDate;
};
