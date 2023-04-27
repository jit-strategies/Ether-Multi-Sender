## Multi-Wallet Ether Transfer Script

This script allows you to transfer a specified amount of Ether to multiple wallets in a single transaction. It uses the Alchemy API to connect to the Goerli test network and the ethers.js library to handle the transactions.

The script requires a configuration file `config.js` that contains the following options:

- `RPC`: The API endpoint for the network (Goerli in this example)
- `ETH`: The amount of Ether to transfer
- `ETHERSCAN`: The Etherscan link for console logging purposes
- `keys`: An object of private keys, where the first key is the main sender's key and the rest are recipient keys

The private keys are stored in an object, and the script creates a wallet instance for each key. It then iterates through the wallets, sending the specified amount of Ether to each recipient wallet in a separate transaction. The transaction hash is logged for each transfer.

To use this script, simply:

1. Clone the repository and navigate to the root directory
2. Update the `config.js` file with your desired values
3. Run the script with Node.js using the command `node transfer.js`
4. Monitor the console for transaction updates and check Etherscan for confirmation

The script is especially useful for sending small amounts of Ether to multiple wallets for testing or airdrop purposes.

**Disclaimer:** This script is intended for educational and testing purposes only. Use at your own risk and always double-check your configuration before running the script. If funsu is gonu, don't call me
