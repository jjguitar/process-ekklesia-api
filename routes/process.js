const express = require('express');
const passport = require('passport');
const ProcessesService = require('../services/process');

const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

require('../utils/auth/strategies/jwt');

function processApi(app) {
  const router = express.Router();
  app.use('/api/process', router);

  const processesService = new ProcessesService();

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;

      try {
        const processes = await processesService.getProcesses({ tags });

        res.status(200).json({
          data: processes,
          message: 'processes listed',
        });
      } catch (err) {
        next(err);
      }
    });

  router.get('/:processId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    async (req, res, next) => {
      const { processId } = req.params;
      try {
        const processUnique = await processesService.getProcess({ processId });

        res.status(200).json({
          data: processUnique,
          message: 'processUnique retrieved',
        });
      } catch (err) {
        next(err);
      }
    });

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:movies']),
    async (req, res, next) => {
      const { body: processUnique } = req;
      try {
        const createdProcessId = await processesService.createProcess({ processUnique });

        res.status(201).json({
          data: createdProcessId,
          message: 'processUnique created',
        });
      } catch (err) {
        next(err);
      }
    });

  router.put('/:processId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:movies']),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { body: processUnique } = req;
      const { processId } = req.params;
      try {
        const updatedProcessId = await processesService.updateProcess({
          processId,
          processUnique,
        });

        res.status(200).json({
          data: updatedProcessId,
          message: 'processUnique updated',
        });
      } catch (err) {
        next(err);
      }
    });

  router.delete('/:processId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:movies']),
    async (req, res, next) => {
      const { processId } = req.params;
      try {
        const deletedProcessId = await processesService.deleteProcess({ processId });

        res.status(200).json({
          data: deletedProcessId,
          message: 'processUnique deleted',
        });
      } catch (err) {
        next(err);
      }
    });
}

module.exports = processApi;
