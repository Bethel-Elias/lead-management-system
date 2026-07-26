const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Lead = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
    },

    company: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.ENUM(
        "New",
        "Contacted",
        "Qualified",
        "Proposal Sent",
        "Won",
        "Lost"
      ),
      defaultValue: "New",
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Lead;
