var express = require("express");
var router = express.Router();

// Helper functions if any
// Add middleware verification for Admin or rate limiting
router.get("/", async (req, res) => {
  console.log("Called Admin API endpoint.");
  res.send({
    message: "Admin",
  });
});

module.exports = router;
