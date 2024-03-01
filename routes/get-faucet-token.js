var express = require("express");
var router = express.Router();

// Helper function if any
const { callFaucet } = require("../helpers/callFaucet");

router.post("/", async (req, res) => {
  console.log("Called Public API endpoint with... ");
  console.log(req.body);

  try {
  } catch (e) {
    console.log(e);
  }

  res.send({
    message: "Dripped successfully!",
    faucetResponse: {
      id: 1,
      jsonrpc: "2.0",
      result: "0x1",
    },
  });
});

module.exports = router;
