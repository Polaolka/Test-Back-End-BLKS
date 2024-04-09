const Config = require('./config');
const app = require('./app');
const mongoose = require("mongoose");

const {DB_HOST, PORT = 3000} = process.env;

const runningServer = async () => {
  console.log('Starting the server...');

  mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

  app.listen(Config.PORT, e => {
    if (!e) {
      return;
    }
    return console.log('Server Error:', e);
  });
  console.log(
    `Server is running! WEB HOST: http://localhost:${Config.PORT}/api/v0`
  );
};

runningServer();
