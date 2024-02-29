var express = require("express");
var router = express.Router();

// Helper function if any

router.get("/", async (req, res) => {
  console.log("Called Public API endpoint... ");
  res.send({
    messge: "Public",
  });
});

module.exports = router;
