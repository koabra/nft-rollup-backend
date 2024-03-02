async function callFaucet(walletParamDetails) {
  try {
    // Call the faucet and wait for response
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walletParamDetails),
    };

    const res = await fetch(
      process.env.CHAIN_RPC_DEST + ":" + process.env.FAUCET_PORT,
      requestOptions
    );
    const response = await res.json();

    if (res.ok) {
      //TODO: continue the process
      return response;
    }
  } catch (error) {
    console.error("Error in fetching from Faucet in chain:", error);
  }
}

module.exports = {
  callFaucet,
};
