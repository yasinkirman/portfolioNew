import * as projectsService from "../services/projects.service.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await projectsService.getAllProjects();
    console.log("11111111projects: ", projects);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addProject = async (req, res) => {
  try {
    const { title, description, github, live, tags } = req.body;
    const project = await projectsService.createProject(
      title,
      description,
      github,
      live,
      tags
    );
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeProject = async (req, res) => {
  try {
    const project = await projectsService.deleteProject(req.params.id);
    if (!project) return res.status(404).json({ error: "Project bulunamadı" });
    res.json({ message: "Project silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editProject = async (req, res) => {
  try {
    const { title, description, github, live, tags } = req.body;
    const project = await projectsService.updateProject(
      req.params.id,
      title,
      description,
      github,
      live,
      tags
    );
    if (!project) return res.status(404).json({ error: "Project bulunamadı" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
