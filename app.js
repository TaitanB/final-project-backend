const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const authRouter = require("./routes/api/users");
const petsRouter = require("./routes/api/pets");
const noticesRouter = require("./routes/api/notices");
const sponsorsRouter = require("./routes/api/sponsors");
const newsRouter = require("./routes/api/news");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", authRouter);
app.use("/api/users/pets", petsRouter);
app.use("/api/notices", noticesRouter);

app.use("/api/sponsors", sponsorsRouter);
app.use("/api/news", newsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
