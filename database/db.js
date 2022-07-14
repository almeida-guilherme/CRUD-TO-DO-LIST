const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect(
    "mongodb+srv://banco:admin@cluster.9izw2.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => {
    console.log("Conectamos ao Servidor :)");
  })
  .catch((error) => {
    console.log(error);
  })
};

module.exports = connectToDb;
