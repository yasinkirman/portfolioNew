import mongoose from "mongoose";

const ProjectsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  github: { type: String, required: true },
  live: { type: String, required: true },
  tags: { type: String, required: true },
});

export default mongoose.model("Projects", ProjectsSchema);
