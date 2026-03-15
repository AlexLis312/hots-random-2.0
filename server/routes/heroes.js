import express from "express";
import { getRandomHero, getHeroes } from "../controllers/heroesController.js";

const router = express.Router();

router.get("/random", getRandomHero);
router.get("/heroes", getHeroes);

export default router;
