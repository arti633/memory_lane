import cors from "cors";
import express from "express";
import { env } from "./config/env";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "server" });
});

app.get("/api", (_req, res) => {
  res.json({ message: "MemoryLane API ready" });
});

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
