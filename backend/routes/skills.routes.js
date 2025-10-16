import express from "express";
import * as skillsController from "../controllers/skills.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// CRUD
router.get("/", async (req, res, next) => {
  try {
    await skillsController.getSkills(req, res);
  } catch (err) {
    next(err);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    await skillsController.addSkill(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    await skillsController.removeSkill(req, res);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    await skillsController.editSkill(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
