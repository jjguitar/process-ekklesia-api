const express = require('express');

const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const processApi = require('./routes/process.js');
const userProcessApi = require('./routes/userProcess.js');
const userLeadersApi = require('./routes/userLeaders.js');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandler.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

authApi(app);
processApi(app);
userProcessApi(app);
userLeadersApi(app);

app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
