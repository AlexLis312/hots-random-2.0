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

// RANDOM HERO BY SOMETH
export const getRandomHero = async (req, res) => {
  try {
    const role = req.query.role === "any" ? null : req.query.role || null;
    const universe = req.query.universe === "any" ? null : req.query.universe || null;

    console.log("Role:", role, "Universe:", universe);

    const heroes = await sql`
      SELECT *
      FROM heroes
      WHERE (${role} IS NULL OR LOWER(role) = LOWER(${role}))
        AND (${universe} IS NULL OR LOWER(universe) = LOWER(${universe}))
      ORDER BY RANDOM()
      LIMIT 1
    `;

    console.log("Rows returned:", heroes.length);

    if (!heroes.length) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.json(heroes[0]);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ message: "DB error", error: err.message });
  }
};
