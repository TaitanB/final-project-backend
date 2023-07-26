const nameRegex = /^[A-Za-z]{2,16}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
const phoneRegex = /^\+380\d{9}$/;
const birthdayRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
const cityRegex = /^[A-Za-z\s]+(?:,\s*[A-Za-z\s]+)*$/;

const perPage = 12;

module.exports = {
  nameRegex,
  emailRegex,
  passwordRegex,
  phoneRegex,
  birthdayRegex,
  cityRegex,
  perPage,
};
