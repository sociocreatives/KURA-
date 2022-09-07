const randomCode = () => {
  const digits = 100000;
  const multier = 9000;
  return Math.floor(digits + Math.random() * multier).toString();
};

export const formatPhoneNumber = async (phone: string) => {
  let phoneNumber = "";
  if (phone.startsWith("254")) {
    phoneNumber = phone;
  } else if (phone.startsWith("0")) {
    phoneNumber = phone.replace("0", "254");
  } else if (phone.startsWith("7")) {
    phoneNumber = "254" + phone;
  } else if (phone.startsWith("+")) {
    phoneNumber = phone.replace("+", "");
  } else if (phone.startsWith("+254")) {
    phoneNumber = phone.replace("+", "");
  }
  return phoneNumber;
};
