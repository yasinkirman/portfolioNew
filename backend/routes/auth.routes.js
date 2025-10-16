import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const ADMIN_USER = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS,
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

export default router;
