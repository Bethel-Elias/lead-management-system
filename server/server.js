require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

// Load all models and associations
require("./models");

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL Connected");

    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Error:", err);
  });
