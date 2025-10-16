import * as experiencesService from "../services/experiences.service.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await experiencesService.getAllExperiences();
    console.log("111111111");
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addExperience = async (req, res) => {
  try {
    const { position, company, durationStart, durationEnd, description } =
      req.body;
    const experience = await experiencesService.createExperience(
      position,
      company,
      durationStart,
      durationEnd,
      description
    );
    res.status(201).json(experience);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeExperience = async (req, res) => {
  try {
    const experience = await experiencesService.deleteExperience(req.params.id);
    if (!experience)
      return res.status(404).json({ error: "Experience bulunamadı" });
    res.json({ message: "Experience silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editExperience = async (req, res) => {
  try {
    const { position, company, durationStart, durationEnd, description } =
      req.body;
    const experience = await experiencesService.updateExperience(
      req.params.id,
      position,
      company,
      durationStart,
      durationEnd,
      description
    );
    if (!experience)
      return res.status(404).json({ error: "Experience bulunamadı" });
    res.json(experience);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
