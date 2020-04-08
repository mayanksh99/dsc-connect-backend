const express = require("express");
const router = express.Router();

// load controller
const {
  getData,
  addData,
  updateData,
  deleteData,
} = require("../../../controllers/data_controller");

// middlewares
const { catchErrors } = require("../../../config/errorHandler");
const { allAuth, adminAuth } = require("../../../middlewares/auth");
const { dataValidation } = require("../../../middlewares/validations");

// routes
router.get("/", catchErrors(getData));
router.post("/", allAuth, dataValidation, catchErrors(addData));
router.put("/:id", allAuth, dataValidation, catchErrors(updateData));
router.delete("/:id", allAuth, catchErrors(deleteData));

// export router
module.exports = router;
