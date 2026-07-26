const { Lead, Activity } = require("../models");

// CREATE LEAD
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
      assigned_to: req.body.assigned_to,
      created_by: req.user.id,
    });

    // Activity Log

    await Activity.create({
      action: "Created lead",
      lead_id: lead.id,
      user_id: req.user.id,
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL LEADS

exports.getLeads = async (req, res) => {
  try {
    let leads;

    if (req.user.role === "admin") {
      leads = await Lead.findAll();
    } else {
      leads = await Lead.findAll({
        where: {
          assigned_to: req.user.id,
        },
      });
    }

    res.json(leads);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET SINGLE LEAD

exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE LEAD

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    await lead.update(req.body);

    await Activity.create({
      action: "Updated lead",
      lead_id: lead.id,
      user_id: req.user.id,
    });

    res.json({
      message: "Lead updated",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE LEAD

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    await lead.destroy();

    await Activity.create({
      action: "Deleted lead",
      lead_id: req.params.id,
      user_id: req.user.id,
    });

    res.json({
      message: "Lead deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
