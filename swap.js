const { ethers } = require("ethers");
require("dotenv").config();

const IUniswapV2Router02 = require("@uniswap/v2-periphery/build/IUniswapV2Router02.json");

const swapAmount = 2500000000000000;

const handler = async function (event, context) {
  try {
    console.log("Received event:", event);

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

    const V2_ROUTER = new ethers.Contract(
      process.env.V2_ROUTER_ADDRESS,
      IUniswapV2Router02.abi
    );

    const PATH = [process.env.WETH_ADDRESS, process.env.TOKEN_ADDRESS];
    const DEADLINE = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes

    for (let i = 0; i < accountWallets.length; i++) {
      const transaction = await V2_ROUTER.connect(
        accountWallets[i]
      ).swapExactETHForTokens(0, PATH, accountWallets[i].address, DEADLINE, {
        value: swapAmount,
      });

      console.log(`Swap ${i} Succesful. Hash [${transaction.hash}]`);
    }

    console.log(`Swap Complete!`);

    console.log(
      `See transactions at: https://goerli.etherscan.io/address/${accountWallets[0].address}`
    );
  } catch (err) {
    console.error(err);
  }
};
handler();
