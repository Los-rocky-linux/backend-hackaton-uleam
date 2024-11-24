const { Router } = require('express');

module.exports = function ({ WorkshopRegistrationController }) {
  const router = Router();

  router.get('/get-all', WorkshopRegistrationController.getAll);
  router.get('/get/:id', WorkshopRegistrationController.getOne);
  router.post('/create', WorkshopRegistrationController.create);
  router.put('/update/:id', WorkshopRegistrationController.update);
  router.delete('/delete/:id', WorkshopRegistrationController.delete);

  return router;
};
