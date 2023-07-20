const nameRegex = /^[A-Za-z]{2,16}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
const phoneRegex = /^\+380\d{9}$/;
const birthdayRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
const cityRegex = /^[A-Za-z\s]+(?:,\s*[A-Za-z\s]+)*$/;

module.exports = {
  nameRegex,
  emailRegex,
  passwordRegex,
  phoneRegex,
  birthdayRegex,
  cityRegex,
};
