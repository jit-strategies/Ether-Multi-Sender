// Bridge to access web3
const { ethers } = require("ethers");

// Network, Network's etherscan
const { RPC, ETHERSCAN } = require("./config");

// Private key object
const { keys } = require("./config");

// Reciever address
const { reciever } = require("./config");

// Add readline for interactive prompts
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promise wrapper for readline question
const askQuestion = (query) => new Promise((resolve) => readline.question(query, resolve));

// Connect to blockchain
const provider = new ethers.providers.JsonRpcProvider(RPC);

// Store all keys in an array
const keyArray = Object.entries(keys).map(([key, value]) => {
  return value;
});

// Create a wallet instance for every key
const accountWallets = keyArray.map(
  (privateKey) => new ethers.Wallet(privateKey, provider)
);

// Transfer function
(async function () {
  try {
    console.log("== Starting Transaction ==");

    // Send ETH from every wallet to the receiver address
    for (let i = 0; i < accountWallets.length; i++) {
      // Get the current wallet's balance
      const balance = await accountWallets[i].getBalance();
      
      // Estimate gas price and gas limit for the transfer
      const gasPrice = await provider.getGasPrice();
      const gasLimit = 21000; // Standard ETH transfer gas limit
      const gasCost = gasPrice.mul(gasLimit);
      
      // Calculate maximum amount to send (balance minus gas cost)
      const maxAmount = balance.sub(gasCost);
      
      if (maxAmount.gt(0)) {
        // Show transaction details and ask for confirmation
        console.log(`\nTransaction ${i + 1} details:`);
        console.log(`From: ${accountWallets[i].address}`);
        console.log(`To: ${reciever}`);
        console.log(`Amount: ${ethers.utils.formatEther(maxAmount)} ETH`);
        console.log(`Gas cost: ${ethers.utils.formatEther(gasCost)} ETH`);
        
        const answer = await askQuestion('Proceed with this transaction? (y/n): ');
        
        if (answer.toLowerCase() === 'y') {
          // Create transaction
          const transaction = await accountWallets[i].sendTransaction({
            // Send to receiver address from config
            to: reciever,
            // Send maximum amount minus gas costs
            value: maxAmount,
            gasLimit: gasLimit,
            gasPrice: gasPrice
          });
          console.log(`Transfer ${i + 1} Successful. Amount: ${ethers.utils.formatEther(maxAmount)} ETH. Tx => [${transaction.hash}]`);
        } else {
          console.log(`Skipping transaction ${i + 1} by user choice`);
        }
      } else {
        console.log(`\nSkipping wallet ${i + 1} (${accountWallets[i].address}) - insufficient balance for gas`);
      }
    }

    console.log(`\n== Transfers Complete! ==`);
    console.log(
      `See transactions at: ${ETHERSCAN}/${reciever}`
    );

    //Log errors to the terminal
  } catch (err) {
    console.error(err);
  } finally {
    // Close readline interface
    readline.close();
  }
})();
