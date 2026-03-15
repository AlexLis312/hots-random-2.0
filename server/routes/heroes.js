import express from "express";
import { getHeroes, getRandomHero } from "../controllers/heroesController.js";

const router = express.Router();

router.get("/", getHeroes);
router.get("/random", getRandomHero);
// router.post("/", createUser);
// router.put("/:id", updateHeroes);
// router.delete("/:id", deleteUser);

export default router;
