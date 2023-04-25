const { ethers } = require("ethers");
require("dotenv").config();

const { V2_ROUTER, RPC, ETH } = require("./config"); // Import V2_ROUTER and RPC
const { keys } = require("./config"); // Import keys as a separate object

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/L86T4ExZKmtSs0AWfbitM0mJ-YbNwzQn"
);

const keyArray = Object.entries(myObj).map(([key, value]) => {
  return value;
});

const accountWallets = keyArray.map(
  (privateKey) => new ethers.Wallet(privateKey, provider)
);

const transferAmount = ethers.utils.parseEther(ETH);

(async function () {
  try {
    console.log("== Starting Transaction ==");

    for (let i = 1; i < accountWallets.length; i++) {
      const transaction = await accountWallets[0].sendTransaction({
        to: accountWallets[i].address,
        value: transferAmount,
      });
      console.log(`Transfer ${i} Successful. Hash [${transaction.hash}]`);
    }

    console.log(`== Transfers Complete! ==`);
    console.log(
      `See transactions at: https://goerli.etherscan.io/address/${accountWallets[0].address}`
    );
  } catch (err) {
    console.error(err);
  }
})();
