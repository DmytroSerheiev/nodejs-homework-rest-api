const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Mangoose Schema
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// Mangoose Model
const Contact = model("contact", contactSchema);

// JOI SCHEMA
const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  favorite: Joi.bool(),
});

// PATCH JOI SCHEMA
const favoriteJoiSchema = Joi.object({ favorite: Joi.bool().required() });

module.exports = { Contact, joiSchema, favoriteJoiSchema };
