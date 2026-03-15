import express from "express";
import { getRandomHero } from "../controllers/heroesController.js";

const router = express.Router();

router.get("/random", getRandomHero);

export default router;
