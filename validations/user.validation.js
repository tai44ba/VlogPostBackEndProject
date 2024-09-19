import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Sorry, you should provide a valid entry"),

  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .isEmail()
    .withMessage("Sorry, this is not a valid Email"),

  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?#$%&*])[0-9a-zA-Z!?#$%&*]{7,}$/
    )
    .withMessage(
      "Sorry, you should provide a valid entry, please check the password requirements: (UpperCase, LowerCase, numbers and special Char[!?#$%&*]"
    ),
];


export const loginValidator = [
    body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .isEmail()
    .withMessage("Sorry, this is not a valid Email"),

  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
]

export const updatePassValidator = [
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .isEmail()
    .withMessage("Sorry, this is not a valid Email"),

  body("newPassword")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?#$%&*])[0-9a-zA-Z!?#$%&*]{7,}$/
    )
    .withMessage(
      "Sorry, you should provide a valid entry, please check the password requirements: (UpperCase, LowerCase, numbers and special Char[!?#$%&*]"
    ),
];