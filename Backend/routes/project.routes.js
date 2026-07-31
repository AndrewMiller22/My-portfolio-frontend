const express = require("express");
const router = express.Router();

const {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require("../controllers/project.controller");

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;