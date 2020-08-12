const express = require('express');

const app = express();

const { config } = require('./config/index');
const usersApi = require('./routes/users.js');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandler.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

usersApi(app);

app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
