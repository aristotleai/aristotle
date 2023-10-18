# Aristotle AI
## Democratizing AI through Blockchain. Decentralized provision of servers for AI / GenAI model training ensuring transparency, efficiency, fairness and social good.

TODO:
1. Connect client to the smart contract escrow
2. Direct integration with servers for permissionless server usage for complete security

Submission to HYPERDRIVE HACKATHON:
There are three segments to the code repo
1. /contracts
Contains the Solana smart contract that governs Aristotle AI. Features implemented:
- Escrow for fund management
- Record of state
- Permissioned account updation
- Provider, User, Job and Server accounts

Instructions implemented:
- Create Server Provider
- Create Server Taker
- List Server
- Delist Server
- Change Server Availability
- Create AI Job
- Cancel AI Job
- Assign Job
- Mark Job Abandoned
- Mark Job Completed
- Report Job Ill Defined
- Accept Server Training Result
- Reject Server Training Result

2. /backend
Code for crud ops on the server. This is used to store the state and fetch listings on the client efficiently
2. /frontend
Client side code for the user facing website. Signup with Solana wallets, prefer to abstract out web3 as much as possible to onboard a wider set of users to the network. Features Implemented:
- Account creation
- View server listings
- View AI Job Listings
- Submit a server with specs
- Submit an AI training job request
- Encrypted data with assigned provider's Public Key

Next steps on frontend:
- Connect escrow
- Add state management buttons for server availability, job states & verification
