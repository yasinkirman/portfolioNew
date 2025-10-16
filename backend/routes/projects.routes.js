import express from "express";
import * as projectsController from "../controllers/projects.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// CRUD
router.get("/", async (req, res, next) => {
  try {
    await projectsController.getProjects(req, res);
    console.log("22222222222");
  } catch (err) {
    console.log(err);

    next(err);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    await projectsController.addProject(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    await projectsController.removeProject(req, res);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    await projectsController.editProject(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
