const express = require('express');
const passport = require('passport');

const UserProcessesService = require('../services/userProcess');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

require('../utils/auth/strategies/jwt');

function userProcessApi(app) {
  const router = express.Router();
  app.use('/api/user-process', router);

  const userProcessesService = new UserProcessesService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-process']),
    async (req, res, next) => {
      const { userId } = req.query;

      try {
        const userProcess = await userProcessesService.getUserProcesses({ userId });

        res.status(200).json({
          data: userProcess,
          message: 'user process listed',
        });
      } catch (error) {
        next(error);
      }
    },
  );
  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-process']),
    async (
      req,
      res,
      next,
    ) => {
      const { body: userProcess } = req;

      try {
        const createdUserProcessId = await userProcessesService.createUserProcess({
          userProcess,
        });

        res.status(201).json({
          data: createdUserProcessId,
          message: 'user process created',
        });
      } catch (err) {
        next(err);
      }
    });

  router.delete(
    '/:userProcessId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-process']),
    async (req, res, next) => {
      const { userProcessId } = req.params;

      try {
        const deletedUserProcessId = await userProcessesService.deleteUserProcess({
          userProcessId,
        });

        res.status(200).json({
          data: deletedUserProcessId,
          message: 'user process deleted',
        });
      } catch (error) {
        next(error);
      }
    },
  );
}

module.exports = userProcessApi;
