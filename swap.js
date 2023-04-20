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

    const ACCOUNT_1 = new ethers.Wallet(env.WALLET_1, provider);

    const V2_ROUTER = new ethers.Contract(
      process.env.V2_ROUTER_ADDRESS,
      IUniswapV2Router02.abi
    );

    const PATH = [process.env.WETH_ADDRESS, process.env.TOKEN_ADDRESS];
    const DEADLINE = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes

    const transaction = await V2_ROUTER.connect(
      ACCOUNT_1
    ).swapExactETHForTokens(0, PATH, ACCOUNT_1.address, DEADLINE, {
      value: swapAmount,
    });

    console.log(`Swap Complete!`);
    console.log(transaction.hash);
    console.log(
      `See transaction at: https://sepolia.etherscan.io/tx/${transaction.hash}/`
    );
  } catch (err) {
    console.error(err);
  }
};
handler();
