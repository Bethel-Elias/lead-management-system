const { Activity, User } = require("../models");

exports.getLeadActivity = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: {
        lead_id: req.params.leadId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(activities);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
