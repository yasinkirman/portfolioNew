import About from "../models/About.js";

// 🔹 Tüm About verisini getir
export const getAbout = async () => {
  return await About.find();
};

// 🔹 About güncelle
export const updateAbout = async (id, { name, title, description, avatar }) => {
  const updateData = { name, title, description };
  if (avatar) updateData.avatar = avatar;

  return await About.findByIdAndUpdate(id, updateData, { new: true });
};
