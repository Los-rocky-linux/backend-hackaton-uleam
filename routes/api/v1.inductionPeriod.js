const { Router } = require('express');

module.exports = function ({ InductionPeriodController }) {
  const router = Router();

  router.get('/get-all', InductionPeriodController.getAll);
  router.get('/get/:id', InductionPeriodController.getOne);
  router.post('/create', InductionPeriodController.create);
  router.put('/update/:id', InductionPeriodController.update);
  router.delete('/delete/:id', InductionPeriodController.delete);

  return router;
};
