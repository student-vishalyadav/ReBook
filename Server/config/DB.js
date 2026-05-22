const mongoose = require("mongoose");

async function main() {
  mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/OLDBOOK");
}

main()
  .then(() => {
    console.log("Data-Base is connected Now ..");
  })
  .catch((error) => {
    console.log("Errors : " + error);
  });

  module.exports = main
