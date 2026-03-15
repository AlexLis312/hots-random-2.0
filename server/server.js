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

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use("/heroes", heroRoutes);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
console.log(process.env.POSTGRES_HOST);
console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_PASSWORD);
console.log(process.env.POSTGRES_PORT);
