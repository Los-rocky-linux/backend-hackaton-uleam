const { Router } = require("express");

module.exports = function ({ UserController  }) {
    const router = Router();

    router.post("/create", UserController.create);
    return router;
};