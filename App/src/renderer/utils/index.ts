export const randomCode = (): string => {
  const digits = 100000;
  const multier = 9000;
  return Math.floor(digits + Math.random() * multier).toString();
};
