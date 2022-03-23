const { User, validate } = require("../models/user");
const _ = require("lodash");

const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

// Get All Users
router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.status(200).send(users);
});

// Create User
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered!");

  // şifre hash'leme kısmı
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // (1)
  //   user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password, //hash yapmak için ne lazım???
  //   });
  // (2)
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  // burada hash'lemede yukarıdaki gibi "password" kısmını almasak bile aşağıdaki
  // gibi sonradn da eklenebilir.
  user.password = hashedPassword;

  await user.save(); //result db'e kaydedilen dökümandır. id bilgisini geri dönelim...

  // .status(200) kullanmasak da yollanıyor
  // user.password değerini geri yollamamak gerektiği için response'tan çıkartıldı
  // (1)
  //res.send({ name: user.name, email: user.email });
  // (2) Objelerle çalışırken daha rahat işlem yapmayı sağlayan "lodash" modülü kullanılabilir
  //_.pick(user, ["name", "email"]);
  // user objesinden, sadece name ve email'den oluşan yeni bir obje oluşturur.
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
