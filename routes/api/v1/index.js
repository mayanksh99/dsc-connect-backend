const express = require("express");
const router = express.Router();

// load controller
const { verify } = require("../../../controllers/index_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { allAuth } = require("../../../middlewares/auth");

// routes
router.get("/verifyEmail/:verifyToken", catchErrors(verify));

// export router
module.exports = router;
