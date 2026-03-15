import sql from "../db.js";

// READ
export const getHeroes = async (req, res) => {
  try {
    const heroes = await sql`SELECT * FROM heroes`;
    res.json(heroes);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
};

// RANDOM

export const getRandomHero = async (req, res) => {
  try {
    const hero = await sql`
      SELECT * FROM heroes
      ORDER BY RANDOM()
      LIMIT 1
    `;

    res.json(hero[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
};
