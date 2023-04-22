const { ethers } = require("ethers");
require("dotenv").config();
const IERC20 = require("@openzeppelin/contracts/build/contracts/ERC20.json");

//Current send amount: 50 USDC
const transferAmount = 50000000;

const handler = async function () {
  try {
    console.log("== Starting transaction ==");

    //Change to the right network provider (Currently Goerli Testnet)
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-goerli.g.alchemy.com/v2/L86T4ExZKmtSs0AWfbitM0mJ-YbNwzQn"
    );

    const privateKeyArray = [
      process.env.WALLET_1,
      process.env.W_2,
      process.env.W_3,
      process.env.W_4,
      process.env.W_5,
      // Add more private keys here
    ];

    const accountWallets = privateKeyArray.map(
      (privateKey) => new ethers.Wallet(privateKey, provider)
    );

    const ERC20 = new ethers.Contract(process.env.TOKEN_ADDRESS, IERC20.abi);

    for (let i = 1; i < accountWallets.length; i++) {
      const transaction = await ERC20.connect(accountWallets[0]).transfer(
        accountWallets[i].address,
        transferAmount
      );
      console.log(`Transfer ${i} Succesful. Hash [${transaction.hash}]`);
    }

    console.log(`== Transfers Complete! ==`);
    console.log(
      `See transactions at: https://goerli.etherscan.io/address/${accountWallets[0].address}`
    );
  } catch (err) {
    console.error(err);
  }
};

handler();
