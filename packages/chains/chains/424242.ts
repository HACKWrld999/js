import type { Chain } from "../src/types";
export default {
  "chain": "FTN",
  "chainId": 424242,
  "explorers": [
    {
      "name": "blockscout",
      "url": "https://testnet.ftnscan.com",
      "standard": "none"
    }
  ],
  "faucets": [],
  "features": [
    {
      "name": "EIP155"
    },
    {
      "name": "EIP1559"
    }
  ],
  "infoURL": "https://fastex.com",
  "name": "Fastex Chain testnet",
  "nativeCurrency": {
    "name": "FTN",
    "symbol": "FTN",
    "decimals": 18
  },
  "redFlags": [],
  "rpc": [
    "https://fastex-chain-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc.testnet.fastexchain.com"
  ],
  "shortName": "fastexTestnet",
  "slug": "fastex-chain-testnet",
  "testnet": true
} as const satisfies Chain;