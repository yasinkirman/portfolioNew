import Experiences from "../models/Experiences.js";

export const getAllExperiences = async () => {
  console.log("1111111111");
  return await Experiences.find();
};

export const createExperience = async (
  position,
  company,
  durationStart,
  durationEnd,
  description
) => {
  const experience = new Experiences({
    position,
    company,
    durationStart,
    durationEnd,
    description,
  });
  return await experience.save();
};

export const deleteExperience = async (id) => {
  return await Experiences.findByIdAndDelete(id);
};

export const updateExperience = async (
  id,
  position,
  company,
  durationStart,
  durationEnd,
  description
) => {
  return await Experiences.findByIdAndUpdate(
    id,
    { position, company, durationStart, durationEnd, description },
    { new: true }
  );
};
