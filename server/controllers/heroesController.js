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
    const role = req.query.role === "any" ? null : req.query.role || null;
    const universe = req.query.universe === "any" ? null : req.query.universe || null;

    console.log("Role:", role, "Universe:", universe);

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

    console.log("Rows returned:", rows.length);

    if (!rows.length) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ message: "DB error", error: err.message });
  }
};
