const generateToken = (): string => {
  return Math.floor(1000000 + Math.random() * 9000000)
    .toString()
    .slice(0, 8)
    .padEnd(8, '0');
};

const generateDate = () => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const dateLocal = new Date(Date.now() - offset).toISOString().slice(0, -1);
  return dateLocal.split('.')[0].replace('T', ' ');
};

export { generateToken, generateDate };
