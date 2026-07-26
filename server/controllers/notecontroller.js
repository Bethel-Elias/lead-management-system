const { Note, Lead, Activity } = require("../models");

// Add Note
exports.addNote = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.leadId);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    const note = await Note.create({
      content: req.body.content,
      lead_id: req.params.leadId,
      user_id: req.user.id,
    });

    await Activity.create({
      action: "Added note",
      lead_id: req.params.leadId,
      user_id: req.user.id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get Notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: {
        lead_id: req.params.leadId,
      },
      order: [["created_at", "DESC"]],
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
