const mongoose = require ('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(`${process.env.DATABASE}`, { useNewUrlParser:true, useUnifiedTopology: true }).then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });;

module.exports = {mongoose}