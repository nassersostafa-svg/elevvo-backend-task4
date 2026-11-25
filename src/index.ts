import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { requestLogger } from "./middleware/logger";

const app = express();
const PORT = 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});