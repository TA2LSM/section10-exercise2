const config = require("config");
const mongoose = require("mongoose");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
// Bu modül, Joi modülüne yeni bir metot (fonksiyon) ekliyor aslında.

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

const express = require("express");
const app = express();

//--- Burası çalışıyor ---
// process.env["vidly_jwtPrivateKey"] = "mySecureKey";
// console.log(process.env.vidly_jwtPrivateKey);

// Terminal "powershell" olarak açılmışsa set vidly_jwtPrivateKey=mySecureKey kısmı
// çalışmıyor. Bunun yerine şöyle yazmak gerkiyor:
// $env:vidly_jwtPrivateKey="mySecureKey"
// console.log(process.env); // ile tüm env variable değerleri görülebilir.

// console.log("Config get():", config.get("jwtPrivateKey"));
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined!");
  process.exit(1);
  // 0 ile çıkma demek hata yok, 0 hariç bir değer, "hata" ile çıkma demek. (genelde 1 kullanılıyor)
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("Connected to the database...");
  })
  .catch((err) => {
    console.error("Couldn't connect to the database!");
  });

app.use(express.json());
app.use("/api/genres", genres); //ilgili istekleri genres router'ına yönlendirir
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
