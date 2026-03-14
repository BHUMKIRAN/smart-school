const getNepalDateString = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
  }).format(new Date());
};

export default getNepalDateString;
