import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import heroRoutes from "./routes/heroes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setInterval(
  () => {
    fetch("https://hots-random-api.onrender.com");
  },
  1000 * 60 * 3,
);
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(
  cors({
    origin: "*",
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/heroes", heroRoutes);
app.use(express.json());

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
