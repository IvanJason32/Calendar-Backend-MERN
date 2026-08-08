import express from "express";
import cors from "cors";
import { dbConnect } from "./database/config.js";
import { authRouter } from "./routes/auth.js";
import { eventsRouter } from "./routes/events.js";

const app = express();
dbConnect();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);

app.use("/", express.static("public"));

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Escuchando desde el puerto ${port}`);
});
