const createError = require("http-errors");
const Project = require("../models/project.model");

const formatProject = (project) => ({
  id: project._id,
  title: project.title,
  completion: project.completion,
  description: project.description,
  image: project.image
});

exports.addProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: formatProject(project)
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: projects.map(formatProject)
    });
  } catch (error) {
    next(error);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(createError(404, "Project not found"));
    }

    res.status(200).json({
      success: true,
      message: "Project retrieved successfully.",
      data: formatProject(project)
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!project) {
      return next(createError(404, "Project not found"));
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully."
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return next(createError(404, "Project not found"));
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};
