const userNameRegex = /^([A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+\s?){2,26}$/;
const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{2,16}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
const phoneRegex = /^\+380\d{9}$/;
const birthdayRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
const cityRegex =
  /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]+(?:,\s*[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]+)*$/;

const perPage = 12;

const ageEnum = {
  FROM_3_TO_12: "3-12m",
  FROM_12_TO_24: "1-2y",
  MORE_THAN_24: ">2y",
};

module.exports = {
  nameRegex,
  emailRegex,
  passwordRegex,
  phoneRegex,
  birthdayRegex,
  cityRegex,
  perPage,
  ageEnum,userNameRegex
};
