const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const leadRoutes = require("./routes/leadRoutes");
const noteRoutes = require("./routes/noteRoutes");
const swagger = require("./config/swagger");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());



// Routes
app.use("/api/auth",authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/leads", noteRoutes);
app.use("/api-docs", swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs));
app.use(errorHandler);


app.get("/", (req, res) => {
  res.json({
    message: "Lead Management API Running",
  });
});

module.exports = app;
