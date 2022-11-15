export const uuidShort = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const uuidLong = () => {
  return (
    uuidShort() +
    uuidShort() +
    "-" +
    uuidShort() +
    "-" +
    uuidShort() +
    "-" +
    uuidShort() +
    "-" +
    uuidShort() +
    uuidShort() +
    uuidShort()
  );
};
