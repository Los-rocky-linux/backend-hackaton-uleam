const { Router } = require('express');

module.exports = function ({ UserController }) {
  const router = Router();
  router.get('/get-all', UserController.getAll);
  router.get('/get/:id', UserController.getOne);
  router.post('/create', UserController.create);
  router.put('/update/:id', UserController.update);
  router.delete('/delete/:id', UserController.delete);
  
  return router;
};
