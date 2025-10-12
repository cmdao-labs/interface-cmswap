import { defineChain } from 'viem'
export const cmChain = defineChain({ id: 88991001, name: 'CMchain', nativeCurrency: {name: 'cJBC', symbol: 'cJBC', decimals: 18}, rpcUrls: {default: {http: ['https://cm-rpc.jibl2.com/']}}, })
