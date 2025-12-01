require("dotenv").config();
const express = require("express");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes")
const errorHandler = require("./middlewares/errorHandler");
const { swaggerSpec } = require("./config/swagger");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/helth", (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use("/auth", authRoutes);

app.use("/order", orderRoutes);

app.use(errorHandler);

module.exports = app;