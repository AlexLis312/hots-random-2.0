import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import heroRoutes from "./routes/heroes.js";

import sql from "./db.js";

dotenv.config();

(async () => {
  try {
    const test = await sql`SELECT NOW()`;
    console.log("Supabase connected:", test);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  }),
);

app.use(express.json());
app.use("/heroes", heroRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
console.log(process.env.POSTGRES_HOST);
console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_PASSWORD);
console.log(process.env.POSTGRES_PORT);
