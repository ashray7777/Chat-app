const express = require("express");
const { accessChat, fetchChats, createGroupChat, removeFromGroup, addToGroup, renameGroup } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").post(protect, removeFromGroup);
router.route("/groupadd").post(protect, addToGroup);

module.exports = router;