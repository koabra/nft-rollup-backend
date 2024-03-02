var express = require("express");
var router = express.Router();

// Helper function if any
const { callFaucet } = require("../helpers/callFaucet");

router.post("/", async (req, res) => {
  console.log("Called Public API endpoint... ");
  let respFromFaucet;
  try {
    respFromFaucet = await callFaucet(req.body);
    console.log("Response from function", respFromFaucet);
  } catch (e) {
    console.log("Error from API endpoint", e);
  }

  if (respFromFaucet) {
    res.send({
      message: "Dripped successfully!",
      faucetResponse: respFromFaucet,
    });
  } else {
    res.status(500).send({ message: "Error: Couldn't get the faucet!" });
  }
});

module.exports = router;
