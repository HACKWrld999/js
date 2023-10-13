import type { Chain } from "../src/types";
export default {
  "chain": "KAVA",
  "chainId": 2221,
  "explorers": [
    {
      "name": "Kava Testnet Explorer",
      "url": "http://testnet.kavascan.com",
      "standard": "EIP3091"
    }
  ],
  "faucets": [
    "https://faucet.kava.io"
  ],
  "features": [],
  "icon": {
    "url": "ipfs://QmdpRTk6oL1HRW9xC6cAc4Rnf9gs6zgdAcr4Z3HcLztusm",
    "width": 1186,
    "height": 360,
    "format": "svg"
  },
  "infoURL": "https://www.kava.io",
  "name": "Kava Testnet",
  "nativeCurrency": {
    "name": "TKava",
    "symbol": "TKAVA",
    "decimals": 18
  },
  "redFlags": [],
  "rpc": [
    "https://kava-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://evm.testnet.kava.io",
    "https://kava-evm-testnet.rpc.thirdweb.com",
    "wss://wevm.testnet.kava.io"
  ],
  "shortName": "tkava",
  "slug": "kava-testnet",
  "testnet": true
} as const satisfies Chain;