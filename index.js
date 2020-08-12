const express = require('express');

const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const usersApi = require('./routes/users.js');
const userProcessApi = require('./routes/process.js');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandler.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

authApi(app);
usersApi(app);
userProcessApi(app);

app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
