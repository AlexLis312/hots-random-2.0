import express from "express";
import { getHeroes, getAllRandomHero, getRandomFromPool } from "../controllers/heroesController.js";

const router = express.Router();

router.get("/", getHeroes);
router.get("/random/all", getAllRandomHero);
router.post("/random/pool", getRandomFromPool);

export default router;
