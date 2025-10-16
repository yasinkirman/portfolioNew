import express from "express";
import * as aboutController from "../controllers/about.controller.js";
import authMiddleware from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();

// Multer dosya yükleme ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET: About bilgilerini getir
router.get("/", async (req, res, next) => {
  try {
    await aboutController.getAbout(req, res);
  } catch (err) {
    next(err);
  }
});

// PUT: About bilgilerini güncelle (admin)
// avatar dosyası için multer.single("avatar") ekledik
router.put(
  "/:id",
  authMiddleware,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      await aboutController.editAbout(req, res, req.file);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
