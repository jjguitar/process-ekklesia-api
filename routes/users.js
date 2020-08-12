const express = require('express');
const UsersService = require('../services/users');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/userAssign', router);

  const userService = new UsersService();

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;

    try {
      const users = await userService.getUsers({ tags });

      res.status(200).json({
        data: users,
        message: 'users listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:userAssignId', async (req, res, next) => {
    const { userAssignId } = req.params;
    try {
      const user = await userService.getUser({ userAssignId });

      res.status(200).json({
        data: user,
        message: 'user retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body: user } = req;
    try {
      const createdUserId = await userService.createUser({ user });

      res.status(201).json({
        data: createdUserId,
        message: 'user created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:userAssignId', async (req, res, next) => {
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
    const { body: user } = req;
    const { userAssignId } = req.params;
    try {
      const updatedUserId = await userService.updateUser({
        userAssignId,
        user,
      });

      res.status(200).json({
        data: updatedUserId,
        message: 'User updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:userAssignId', async (req, res, next) => {
    const { userAssignId } = req.params;
    try {
      const deletedMovieId = await userService.deleteUser({ userAssignId });

      res.status(200).json({
        data: deletedMovieId,
        message: 'user deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesApi;
