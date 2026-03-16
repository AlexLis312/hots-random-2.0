import sql from "../db.js";

// READ ALL
export const getHeroes = async (req, res) => {
  try {
    const heroes = await sql`SELECT * FROM heroes`;
    res.json(heroes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB error", error: err.message });
  }
};

// RANDOM HERO
export const getAllRandomHero = async (req, res) => {
  try {
    const heroes = await sql`
      SELECT *
      FROM heroes
      ORDER BY RANDOM()
      LIMIT 1
    `;

    if (!heroes.length) {
      return res.status(404).json({ message: "No heroes in DB" });
    }

    res.json(heroes[0]);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ message: "DB error", error: err.message });
  }
};

// RANDOM HERO FROM POOL
export const getRandomFromPool = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No heroes selected" });
    }

    const heroes = await sql`
      SELECT *
      FROM heroes
      WHERE id = ANY(${sql(ids)})
      ORDER BY RANDOM()
      LIMIT 1
    `;

    if (!heroes.length) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.json(heroes[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB error" });
  }
};
