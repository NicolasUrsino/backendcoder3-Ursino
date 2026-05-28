import express from "express";
import compression from "express-compression";
import userRouter from "./routes/users.router.js";
import adoptionRouter from "./routes/adoption.router.js";
import mainError from "./middleware/errors/mainError.js";
import { addLogger } from "./utils/logger.js";

const app = express();

app.use(express.json());
app.use(compression({ brotli: { enabled: true, zlib: {} } }));

app.use(addLogger);

app.get("/", (req, res) => {
  req.logger?.warning?.(`Warning en '${req.url}'`);
  req.logger?.info?.(`Hoy es ${new Date().toLocaleDateString()}`);
  res.send("Pagina principal");
});

app.use("/api/users", userRouter);
app.use("/api/adoptions", adoptionRouter);

app.get("/operacionSimple", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1000; i++) {
    sum += 1;
  }
  res.send({ sum });
});

app.get("/operacionCompleja", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 10000000; i++) {
    sum += 1;
  }
  res.send({ sum });
});

app.use(mainError);

export default app;
