const { ethers } = require("ethers");
const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');

const NFT_CONTRACT_ADDRESS = "0x8b66a443118BF4C91a838246E577B76Dc6cC2C83";

const NFT_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_tokenUrl",
                "type": "string"
            }
        ],
        "name": "mint_url",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

exports.handler = async function (event) {
    const {body} = event.request;
    const tokenURI = body.tokenURI;
    const to = body.to;

    // Initialize defender relayer provider and signer
    const provider = new DefenderRelayProvider(event);
    const signer = new DefenderRelaySigner(event, provider, {speed: 'fast'});

    // Create contract instance from the signer and use it to send a tx
    const NFTContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);

    const tx = await NFTContract.mint_url(to, tokenURI);
    console.log(`NFT minted tokenURI: ${tokenURI} to ${to}`);
    return tx;
}
