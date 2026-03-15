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
    const role = req.query.role || null;
    const universe = req.query.universe || null;

    const { rows } = await pool.query(
      `
    SELECT *
    FROM heroes
    WHERE ($1::text IS NULL OR role = $1)
    AND ($2::text IS NULL OR universe = $2)
    ORDER BY RANDOM()
    LIMIT 1
    `,
      [role, universe],
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
};
