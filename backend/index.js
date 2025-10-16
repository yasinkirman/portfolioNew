import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import skillsRoutes from "./routes/skills.routes.js";
import experiencesRoutes from "./routes/experiences.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import authRoutes from "./routes/auth.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Portfolio Backend Running ✅");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/experiences", experiencesRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
