import Projects from "../models/Projects.js";

export const getAllProjects = async () => {
  console.log("1111111111projects: ");
  return await Projects.find();
};

export const createProject = async (title, description, github, live, tags) => {
  const project = new Projects({
    title,
    description,
    github,
    live,
    tags,
  });
  return await project.save();
};

export const deleteProject = async (id) => {
  return await Projects.findByIdAndDelete(id);
};

export const updateProject = async (
  id,
  title,
  description,
  github,
  live,
  tags
) => {
  return await Projects.findByIdAndUpdate(
    id,
    { title, description, github, live, tags },
    { new: true }
  );
};
