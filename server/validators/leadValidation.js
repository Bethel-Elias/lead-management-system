const { body } = require("express-validator");

exports.createLeadValidation = [
  body("name").notEmpty().withMessage("Lead name is required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("phone")
    .optional()
    .isLength({
      min: 10,
    })
    .withMessage("Invalid phone number"),

  body("company").optional().isString(),
];
