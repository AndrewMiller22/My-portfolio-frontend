const express = require("express");
const router = express.Router();

const {
    addService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
} = require("../controllers/service.controller");

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", addService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;