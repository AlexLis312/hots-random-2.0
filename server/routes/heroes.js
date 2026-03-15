import express from "express";
import { getRandomHero, getHeroes } from "../controllers/heroesController.js";

const router = express.Router();

router.get("/", getHeroes);
router.get("/random", getRandomHero);

export default router;
