const express = require('express');
const passport = require('passport');

const UserLeadersService = require('../services/userLeaders');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

require('../utils/auth/strategies/jwt');

function userLeaderApi(app) {
  const router = express.Router();
  app.use('/api/user-leader', router);

  const userLeadersService = new UserLeadersService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-process']),
    async (req, res, next) => {
      const { userId } = req.query;

      try {
        const userLeaders = await userLeadersService.getUserLeaders({ userId });

        res.status(200).json({
          data: userLeaders,
          message: 'users leaders listed',
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
      const { body: userLeader } = req;

      try {
        const createdUserLeaderId = await userLeadersService.createUserLeader({
          userLeader,
        });

        res.status(201).json({
          data: createdUserLeaderId,
          message: 'user leader created',
        });
      } catch (err) {
        next(err);
      }
    });

  router.delete(
    '/:userLeaderId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-process']),
    async (req, res, next) => {
      const { userLeaderId } = req.params;

      try {
        const deletedUserLeaderId = await userLeadersService.deleteUserLeader({
          userLeaderId,
        });

        res.status(200).json({
          data: deletedUserLeaderId,
          message: 'user leader deleted',
        });
      } catch (error) {
        next(error);
      }
    },
  );
}

module.exports = userLeaderApi;
