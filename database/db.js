const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => {
    console.log("Conectamos ao Servidor :)");
  })
  .catch((error) => {
    console.log(error);
  })
};

module.exports = connectToDb;
