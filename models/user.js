const mongoose = require("mongoose");
const Joi = require("joi");

const DEF_USER_NAME_MIN = 3;
const DEF_USER_NAME_MAX = 50;
const DEF_USER_EMAIL_MIN = 7;
const DEF_USER_EMAIL_MAX = 255;
const DEF_USER_PASSWORD_MIN = 5;
const DEF_USER_PASSWORD_MAX = 255;
const DEF_USER_PASSWORD_MAX_HASH = 1024;

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: DEF_USER_NAME_MIN,
      maxlength: DEF_USER_NAME_MAX,
    },
    email: {
      type: String,
      unique: true,
      minlength: DEF_USER_EMAIL_MIN,
      maxlength: DEF_USER_EMAIL_MAX,
    },
    password: {
      type: String,
      required: true,
      minlength: DEF_USER_PASSWORD_MIN,
      maxlength: DEF_USER_PASSWORD_MAX_HASH, // hash tipi şifreleri için yüksek tutuldu
    },
  })
);

function userValidate(user) {
  const schema = {
    name: Joi.string().min(DEF_USER_NAME_MIN).max(DEF_USER_NAME_MAX).required(),
    email: Joi.string().min(DEF_USER_EMAIL_MIN).max(DEF_USER_EMAIL_MAX).required().email(),
    // email metodunu çağırarak geçerli bir email girildiğine emin oluyoruz
    password: Joi.string().min(DEF_USER_PASSWORD_MIN).max(DEF_USER_PASSWORD_MAX).required(),
    // kullanıcı 255 karaktere kadar şifre yollayacak ama biz mongodb'de bunu hash edip saklayacağız
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = userValidate;
