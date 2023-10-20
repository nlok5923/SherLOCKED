# sherLOCKED
> FHE based privacy enabling solution for EVM (ZK + FHE + MPC)

## Problem
Everything on blockchain is public by design. Once a transaction is added to the blockchain, it becomes visible to anyone who wishes to see it. Though, it caters the core decentralised nature of the blockchain, it also open multiple scenarios of information getting snooped. Some of them are - 

1. Wallet Spying - Since whatever values an account holds is visible on the block explorer. Anyone can analyse the wallets about the activity, which might not be desirable for every account holder like institutional investors, or some account owners who doesn’t wishes to disclose its amount.
2. MEV Extraction - Since miners have the authority to decide which transactions get included in a block, and as the data is public, they can exploit this privilege to their advantage, often at the expense of regular users.
3. Scam Attacks - Dusting attacks is a perfect example, where an attacker sends small amounts of cryptocurrency to a large number of public addresses. Since all transactions are publicly recorded, the attacker can then track the movement of these "dusted" funds and try to identify patterns or clusters of addresses that belong to a single entity. Armed with this information, the attacker could engage in more targeted phishing attempts or other types of fraud.

On all the above issues, the core problem is the public visibility of the data on the blockchain. sherLocked is a full scale developer friendly solution to encrypt this public data, so anyone trying to snoop on the data is unable to make sense out of it.

## Solution
SherLOCKED is a full fledged infrastructure developed from scratch which devs can use to write their custom smart contracts capable of operating on encrypted data over the blockchain.

1. When the user sends the transaction to the smart contract, before calling the function on chain, it is first encrypted by the MPC based encryptor and the encrypted comes to the SDK.
2. SDK then calls the smart contract function with encrypted data as function parameters. Thus the smart contract operates on the encrypted data.
3. Computation on the encrypted data is gas heavy, therefore it is outsourced to zkVM based RISC0 proof computer which computes and provide the proofs to ensure that the operations performed are legit. The proof is then verified by the relayer deployed on the EVM chain and then finally states updated.
4. On chain every computation happened in encrypted domain, the user can decrypt the data later with the help of MPC based decryptor, after proving the ownership of data.

For this hackathon we have demonstrated it over the ERC20 tokens. We have implemented our own custom ERC20 contract which stores the token balance in encrypted domain. All operations like transfer, balanceOf is done in encrypted domain, which is decrypted by the MPC decryptor to show the exact asset value.
