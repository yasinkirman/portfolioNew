import Skills from "../models/Skills.js";

export const getAllSkills = async () => {
  console.log("1111111111");
  return await Skills.find();
};

export const createSkill = async (name, level) => {
  const skill = new Skills({ name, level });
  return await skill.save();
};

export const deleteSkill = async (id) => {
  return await Skills.findByIdAndDelete(id);
};

export const updateSkill = async (id, name, level) => {
  return await Skills.findByIdAndUpdate(id, { name, level }, { new: true });
};
