import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  avatar: { type: String, required: true }, // avatar URL
  description: { type: [String], required: true }, // birden fazla paragraf
});

export default mongoose.model("About", AboutSchema);
