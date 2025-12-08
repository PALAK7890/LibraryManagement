const express = require("express");
const router = express.Router();

const { getAdminStats, seedBooks } = require("../controllers/adminStats");

router.get("/stats", getAdminStats);
router.get("/seed-books", seedBooks);

module.exports = router;
