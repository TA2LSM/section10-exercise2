// şifreleri hash'lemek için gerekli alıştırmaların yapıldığı kod dosyasıdır.
//--- 21.03.2022 ---

// bcrypt obje döndüğü için bcrypt olarak küçük harfle başlayan const değere aldık.
const bcrypt = require("bcrypt");

// hash'leme için önce bir salt değeri lazım. Bu ne kadar karmaşık olursa hash'lenen
// değerin de çözülmesi o kadar zor olur. .genSalt() metodu 2 çeşittir. sync ve async.
// ayrıda overload olarak callback'li ya da promise'li olarak çalışabilir. Biz async
// ve promise'li yöntemi seçtik.

async function run() {
  const password = "1234";
  const salt = await bcrypt.genSalt(10);
  // parametre default: 10 olarak alındı. (salt değerinin çözülme zorluğu)

  console.log(salt);
  // $2b$10$rVl/H.a4IBNyS6MXZJCunu gibi bir değer üretti. Burada $10$ kullandığımız
  // round değeri

  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);

  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log(isValid);
}

run();
