const assert = require('assert');
const fincorjs = require("../src");

const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";

describe("Fincorcluster", function() {
	const chainId = "testnet";
	const fincor = fincorjs.network("http://127.0.0.1:1317/", chainId);
	describe("getAddress", function () {

		it("gets a fincor address from mnemonic", function () {
			let address = fincor.getAddress(mnemonic);
			assert.strictEqual(address, "fincor1fnk3lxlks7tdg6x55ynv6vggtnd73ycqun3rf4");
		});
	});
	
	describe("sign", function () {
		it("creates a deterministic signature", function () {
			let address = fincor.getAddress(mnemonic);
			let ecpairPriv = fincor.getECPairPriv(mnemonic);
	
			let stdSignMsg = fincor.newStdMsg({
				msgs: [
					{
						type: "cusp-sdk/MsgSend",
						value: {
							amount: [
								{
									amount: String(100000), 	// 6 decimal places (1000000 ffnr = 1 FNR)
									denom: "ffnr"
								}
							],
							from_address: address,
							to_address: "fincor18vhdczjut44gpsy804crfhnd5nq003nz0nf20v"
						}
					}
				],
				chain_id: chainId,
				fee: { amount: [ { amount: String(5000), denom: "ffnr" } ], gas: String(200000) },
				memo: "",
				account_number: String(5711),
				sequence: String(4)
			});
	
			let signedTx = fincor.sign(stdSignMsg, ecpairPriv);
	
			assert.strictEqual(signedTx.tx.signatures[0].signature, "T5j0wjfOQp0rK+2Pz8CDxiElw97b1UXOdOJ8y0QjZcJ9KQTW0HLOOwX2/iamllgNwDd+mW2Px+QRNc2SlLoBYQ==");
		});
	});
});



