const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URL, PORT } = require('./app-config');

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
