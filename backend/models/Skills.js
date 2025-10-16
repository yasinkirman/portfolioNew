import mongoose from "mongoose";

const SkillsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true }, // yüzde 0-100
});

export default mongoose.model("Skills", SkillsSchema);
