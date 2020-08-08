const express = require('express');
const { processMock } = require('../utils/mocks/process');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/userAssign', router);

  router.get('/', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(processMock);

      res.status(200).json({
        data: movies,
        message: 'users listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:userAssignId', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(processMock[0]);

      res.status(200).json({
        data: movies,
        message: 'user retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const createdMovieId = await Promise.resolve(processMock[0].id);

      res.status(201).json({
        data: createdMovieId,
        message: 'user created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:userAssignId', async (req, res, next) => {
    try {
      const updatedMovieId = await Promise.resolve(processMock[0].id);

      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:userAssignId', async (req, res, next) => {
    try {
      const deletedMovieId = await Promise.resolve(processMock[0].id);

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
