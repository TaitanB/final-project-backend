const nameRegex =
  /^([A-ZА-ЯЁІЇЄҐ'][A-Za-zА-Яа-яЁёІіЇїЄєҐґ']+\s?){1,26}$|^([A-ZА-ЯЁІЇЄҐ'][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ'\s]*(?:-[A-ZА-ЯЁІЇЄҐ'][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ'\s]*)){1,26}$/;
const cityRegex =
  /^[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ]*$|^[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ\s]*[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ\s]*$|^[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ\s]*(?:-[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ\s]*)$|^[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ\s]*(?:-\s*[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ\s]*)*(?:,\s*[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ\s]*)$|^[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ\s-]*(?:,\s[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ\s-]*)[A-ZА-ЯЁІЇЄҐ][a-zA-Zа-яА-ЯЁёІіЇїЄєҐґ\s]*$/;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
const phoneRegex = /^\+380\d{9}$/;
const birthdayRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

const perPage = 12;

const ageEnum = {
  FROM_0_TO_12: "0-12m",
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
  ageEnum,
};
