import express from "express";
import * as experiencesController from "../controllers/experiences.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// CRUD
router.get("/", async (req, res, next) => {
  try {
    await experiencesController.getExperiences(req, res);
  } catch (err) {
    next(err);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    await experiencesController.addExperience(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    await experiencesController.removeExperience(req, res);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    await experiencesController.editExperience(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
