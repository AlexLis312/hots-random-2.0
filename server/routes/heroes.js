import express from "express";
import { getRandomHero, getHeroes, getAllRandomHero } from "../controllers/heroesController.js";

const router = express.Router();

router.get("/", getHeroes);
router.get("/random", getRandomHero);
router.get("/random/all", getAllRandomHero);

export default router;
