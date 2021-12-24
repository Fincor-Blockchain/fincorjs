
This library provides supports for fincor transaction signing and broadcasting. 
## Installation

In order to fully use this library, you need to run a local or remote full node and set up its rest server.
### NPM

```bash
npm install @fincor/fincorjs
```

### Yarn

```bash
yarn add @fincor/fincorjs
```

### Browser Support

This version does not support browsers

## Import 

#### NodeJS

```js
const fincorjs = require("@fincor/fincorjs");
```

## Usage
- Generate address from mnemonic 
```js
const fincorjs = require("@fincor/fincorjs");

const chainId = "testnet";
const fincor = fincorjs.network("YOUR_NODE_URL", chainId);

const mnemonic = "YOUR_SEED_PHRASE"
fincor.setPath("m/44'/629'/0'/0/0"); //hd path for fincor
const address = fincor.getAddress(mnemonic);
const ecpairPriv = fincor.getECPairPriv(mnemonic);
```

Generate ECPairPriv value that is needed for signing signatures
```js
const ecpairPriv = fincor.getECPairPriv(mnemonic);
```

Transfer FNR to designated address. 
* Make sure to input proper type, account number, and sequence of the fincor account to generate StdSignMsg. You can get those account information on blockchain 
```js
fincor.getAccounts(address).then(data => {
	let stdSignMsg = fincor.newStdMsg({
		msgs: [
			{
				type: "cusp-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(100), 	// 6 decimal places ( 1 FNR = 1000000ffnr)
							denom: "ffnr"           // coin denomination is ffnr
						}
					],
					from_address: address,
					to_address: "fincor18vhdczjut44gpsy804crfhnd5nq003nz0nf20v"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(20000), denom: "ffnr" } ], gas: String(200000) },
		memo: "MY_LIB_TEST_MEMO",
		account_number: String(data.result.value.account_number),
		sequence: String(data.result.value.sequence)
	});

	...
})
```

Sign transaction by using stdSignMsg and broadcast by using [/txs](https://YOUR_NODE_URL/txs) REST API
```js
const signedTx = fincor.sign(stdSignMsg, ecpairPriv);
fincor.broadcast(signedTx).then(response => console.log(response));
```

Validate Wallet Address
```js
fincor.validateAddress("fincor1da4v3fxy3xkkgqr5g60cjmcpvjcjdd5e4m0qwa")

```
 Wallet Address Balance
```js
fincor.getAddressBalance("fincor1da4v3fxy3xkkgqr5g60cjmcpvjcjdd5e4m0qwa")

```

## Documentation

This library is simple and easy to use. We don't have any formal documentation yet other than examples. Ask for help if our examples aren't enough to guide you