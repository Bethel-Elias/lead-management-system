const User = require("./user");
const Lead = require("./Lead");
const Note = require("./Note");
const Activity = require("./Activity");

/*
|--------------------------------------------------------------------------
| User ↔ Lead
|--------------------------------------------------------------------------
*/

// User created many leads
User.hasMany(Lead, {
  foreignKey: "created_by",
  as: "createdLeads",
});

Lead.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator",
});

// User assigned many leads
User.hasMany(Lead, {
  foreignKey: "assigned_to",
  as: "assignedLeads",
});

Lead.belongsTo(User, {
  foreignKey: "assigned_to",
  as: "assignee",
});

/*
|--------------------------------------------------------------------------
| Lead ↔ Note
|--------------------------------------------------------------------------
*/

Lead.hasMany(Note, {
  foreignKey: "lead_id",
  as: "notes",
  onDelete: "CASCADE",
});

Note.belongsTo(Lead, {
  foreignKey: "lead_id",
});

/*
|--------------------------------------------------------------------------
| User ↔ Note
|--------------------------------------------------------------------------
*/

User.hasMany(Note, {
  foreignKey: "user_id",
});

Note.belongsTo(User, {
  foreignKey: "user_id",
});

/*
|--------------------------------------------------------------------------
| Lead ↔ Activity
|--------------------------------------------------------------------------
*/

Lead.hasMany(Activity, {
  foreignKey: "lead_id",
  as: "activities",
  onDelete: "CASCADE",
});

Activity.belongsTo(Lead, {
  foreignKey: "lead_id",
});

/*
|--------------------------------------------------------------------------
| User ↔ Activity
|--------------------------------------------------------------------------
*/

User.hasMany(Activity, {
  foreignKey: "user_id",
});

Activity.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Lead,
  Note,
  Activity,
};
