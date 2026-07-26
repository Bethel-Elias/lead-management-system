const activityController = require("../controllers/activitycontroller");

router.get("/:leadId/activity", protect, activityController.getLeadActivity);
