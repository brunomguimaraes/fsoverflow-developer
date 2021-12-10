const generateToken = (): string => {
  return Math.floor(1000000 + Math.random() * 9000000)
    .toString()
    .slice(0, 8)
    .padEnd(8, '0');
};

export { generateToken };
