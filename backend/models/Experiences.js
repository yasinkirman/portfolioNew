import mongoose from "mongoose";

const ExperiencesSchema = new mongoose.Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  durationStart: { type: String, required: true },
  durationEnd: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Experiences", ExperiencesSchema);
