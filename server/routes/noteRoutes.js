const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");

const noteController = require("../controllers/notecontroller");

router.post("/:leadId/notes", protect, noteController.addNote);

router.get("/:leadId/notes", protect, noteController.getNotes);

module.exports = router;
