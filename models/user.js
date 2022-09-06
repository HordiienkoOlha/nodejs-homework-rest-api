const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const bcrypt = require("bcryptjs");

const { handleSchemaValidationErrors } = require("../helpers");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationErrors);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
    .label("Subscription Type")
    .valid("starter", "pro", "business")
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
// const schemaSubscription = Joi.object({
//   subscription: Joi.string()
//     .label("Subscription Type")
//     .valid("starter", "pro", "business")
//     .required(),
// });

const schemas = {
  registerSchema,
  loginSchema,
  // schemaSubscription,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
