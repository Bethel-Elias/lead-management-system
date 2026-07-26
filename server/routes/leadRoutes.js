const router = require("express").Router();

const controller = require("../controllers/leadController");

const { protect } = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/rolemiddleware");

const validate = require("../middleware/validateMiddleware");

const { createLeadValidation } = require("../validators/leadValidation");

// Create lead
// router.post("/", protect, controller.createLead);
router.post("/", protect, createLeadValidation, validate, controller.createLead);

// Get all leads

router.get("/", protect, controller.getLeads);

// Get single lead

router.get("/:id", protect, controller.getLead);

// Update

router.put("/:id", protect, controller.updateLead);

// Delete (ADMIN ONLY)

router.delete("/:id", protect, adminOnly, controller.deleteLead);

module.exports = router;
