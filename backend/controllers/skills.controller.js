import * as skillsService from "../services/skills.service.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await skillsService.getAllSkills();
    console.log("111111111");
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addSkill = async (req, res) => {
  try {
    const { name, level } = req.body;
    const skill = await skillsService.createSkill(name, level);
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeSkill = async (req, res) => {
  try {
    const skill = await skillsService.deleteSkill(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill bulunamadı" });
    res.json({ message: "Skill silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editSkill = async (req, res) => {
  try {
    const { name, level } = req.body;
    const skill = await skillsService.updateSkill(req.params.id, name, level);
    if (!skill) return res.status(404).json({ error: "Skill bulunamadı" });
    res.json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
