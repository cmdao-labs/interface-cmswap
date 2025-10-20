"use client"
import { useAccount } from 'wagmi'
import { useState, useEffect } from "react"
import { ArrowDown, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { simulateContract, waitForTransactionReceipt, writeContract, readContracts, type WriteContractErrorType } from '@wagmi/core'
import { formatEther, parseEther, erc20Abi } from 'viem'
import { config } from '@/config/reown'
import ErrorModal from '@/components/cmswap/error-modal'

const chains: { name: string, id: number, logo: string }[] = [
    { name: 'JB chain', id: 8899, logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreiguxm4at5dehn6s7v2qniim7edqsntdmukwjmgyqkr4rv4aujvbdy' },
    { name: 'KUB chain', id: 96, logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreifelq2ktrxybwnkyabw7veqzec3p4v47aoco7acnzdwj34sn7q56u' },
    { name: 'BNB chain', id: 56, logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreifw5yj7khnjb7vm6jpsos5cuzmaasi7gbg4y73lgrsvlnsvwxvlai' },
]

const tokens: { name: string, value: '0xstring', logo: string }[][] = [
    [{ name: 'JUSDT', value: '0x24599b658b57f91E7643f4F154B16bcd2884f9ac' as '0xstring', logo: 'https://gateway.pinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi' },],
    [{ name: 'KUSDT', value: '0x7d984C24d2499D840eB3b7016077164e15E5faA6' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreieg7yf6iwx7obygg62hz252bwnaddedanvlizonaawagk7eze4qcu' },],
    [{ name: 'USDT', value: '0x55d398326f99059fF775485246999027B3197955' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreieg7yf6iwx7obygg62hz252bwnaddedanvlizonaawagk7eze4qcu' },],
]

export default function BridgeInterface() {
    const [txupdate, setTxupdate] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState<WriteContractErrorType | null>(null)
    const { address, chainId } = useAccount()
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [open4, setOpen4] = useState(false)
    const [sourceChain, setSourceChain] = useState(chains[0])
    const [sourceTokens, setSourceTokens] = useState(tokens[0])
    const [tokenA, setTokenA] = useState(tokens[0][0])
    const [destinationChain, setDestinationChain] = useState(chains[1])
    const [destinationTokens, setDestinationTokens] = useState(tokens[1])
    const [tokenB, setTokenB] = useState(tokens[1][0])
    const [reserve, setReserve] = useState('0')
    const [sourceBalance, setSourceBalance] = useState('0')
    const [destinationBalance, setDestinationBalance] = useState('0')
    const [escrowAddress, setEscrowAddress] = useState('0x' as '0xstring')
    const [bridgeFee, setBridgeFee] = useState('0')
    const [depositValue, setDepositValue] = useState('')

    useEffect(() => {
        const fetch0 = async () => {
            let reserveAddr = '0x' as '0xstring'
            if (sourceChain.id === 8899 && destinationChain.id === 96) {
                reserveAddr = '0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63' as '0xstring'
                setBridgeFee('0.1')
                setEscrowAddress('0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7' as '0xstring')
            } else if (sourceChain.id === 96 && destinationChain.id === 8899) {
                reserveAddr = '0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7' as '0xstring'
                setBridgeFee('0.1')
                setEscrowAddress('0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63' as '0xstring')
            } else if (sourceChain.id === 8899 && destinationChain.id === 56) {
                reserveAddr = '0x92E2fB6B899E715B6D392B7b1b851a9f7aae2dc3' as '0xstring'
                setBridgeFee('0.5')
                setEscrowAddress('0x9E1baBFC65DA0eBFE11934b1277755Eb3A7d3063' as '0xstring')
            } else if (sourceChain.id === 56 && destinationChain.id === 8899) {
                reserveAddr = '0x9E1baBFC65DA0eBFE11934b1277755Eb3A7d3063' as '0xstring'
                setBridgeFee('0.5')
                setEscrowAddress('0x92E2fB6B899E715B6D392B7b1b851a9f7aae2dc3' as '0xstring')
            }
            const data = await readContracts(config, {
                contracts: [
                    { address: tokenB.value, abi: erc20Abi, functionName: 'balanceOf', args: [reserveAddr], chainId: destinationChain.id },
                    { address: tokenA.value, abi: erc20Abi, functionName: 'balanceOf', args: [address as '0xstring'], chainId: sourceChain.id },
                    { address: tokenB.value, abi: erc20Abi, functionName: 'balanceOf', args: [address as '0xstring'], chainId: destinationChain.id },
                ],
            })
            data[0].result !== undefined ? setReserve(formatEther(data[0].result)) : setReserve('0')
            data[1].result !== undefined ? setSourceBalance(formatEther(data[1].result)) : setSourceBalance('0')
            data[2].result !== undefined ? setDestinationBalance(formatEther(data[2].result)) : setDestinationBalance('0')
        }

        fetch0()
    }, [config, address, txupdate, erc20Abi, sourceChain, destinationChain])

    const bridge = async () => {
        setIsLoading(true)
        try {
            const { request } = await simulateContract(config, {address: tokenA.value, abi: erc20Abi, functionName: 'transfer', args: [escrowAddress, parseEther(depositValue)], chainId: sourceChain.id})
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#0a0b1e] p-4 bg-gradient-to-br from-slate-700 via-black to-emerald-900">
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
            <Card className="w-full max-w-xl mx-auto bg-water-950 border border-[#00ff9d]/20 rounded-lg overflow-hidden p-4 mb-8 mt-[100px]">
                <div className="flex space-x-1"><button className="w-full text-left flex-1 py-2 text-sm roundedbg-[#162638] text-[#00ff9d]">Bridge</button></div>
                <div className="space-y-2 mb-4">
                    <div className="p-3 rounded bg-[#0a0b1e]/50 border border-[#00ff9d]/10">
                        <div className="text-xs text-gray-500 mb-1">From</div>
                        <div className="flex items-center justify-between">
                            <div className="text-white">Source Chain</div>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 flex items-center justify-between h-10 cursor-pointer">
                                        <div className='gap-2 flex flex-row items-center justify-center'>
                                            <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                                <span className="text-[#00ff9d] text-xs">{sourceChain.logo !== '../favicon.ico' ? <img alt="" src={sourceChain.logo} className="size-5 shrink-0 rounded-full" /> : '?'}</span>
                                            </div>
                                            <span className='truncate'>{sourceChain.name}</span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-[#00ff9d]" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0 z-100">
                                    <Command>
                                        <CommandInput placeholder="Search chains..." />
                                        <CommandList>
                                            <CommandEmpty>No chains found.</CommandEmpty>
                                            <CommandGroup>
                                                {chains.map((chain, index) => (
                                                    <CommandItem
                                                        key={chain.name}
                                                        value={chain.name}
                                                        onSelect={() => {
                                                            if (chain.id !== destinationChain.id) {
                                                                setSourceChain(chain)
                                                                setSourceTokens(tokens[index])
                                                                setTokenA(tokens[index][0])
                                                            }
                                                            setOpen(false)
                                                        }}
                                                        className='cursor-pointer'
                                                    >
                                                        <div className="flex items-center">
                                                            <img alt="" src={chain.logo} className="size-5 shrink-0 rounded-full" />
                                                            <span className="ml-3 truncate">{chain.name}</span>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="flex justify-center my-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-[#162638] border border-[#00ff9d]/20 h-8 w-8 cursor-pointer"
                            onClick={() => {
                                const temp = sourceChain
                                setSourceChain(destinationChain)
                                setDestinationChain(temp)
                                const temp2 = sourceTokens
                                setSourceTokens(destinationTokens)
                                setDestinationTokens(temp2)
                                const temp3 = tokenA
                                setTokenA(tokenB)
                                setTokenB(temp3)
                            }}
                        >
                            <ArrowDown className="h-4 w-4 text-[#00ff9d]" />
                        </Button>
                    </div>

                    <div className="p-3 rounded bg-[#0a0b1e]/50 border border-[#00ff9d]/10">
                        <div className="text-xs text-gray-500 mb-1">To</div>
                        <div className="flex items-center justify-between">
                            <div className="text-white">Destination Chain</div>
                            <Popover open={open2} onOpenChange={setOpen2}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={open2} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 flex items-center justify-between h-10 cursor-pointer">
                                        <div className='gap-2 flex flex-row items-center justify-center'>
                                            <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                                <span className="text-[#00ff9d] text-xs">{destinationChain.logo !== '../favicon.ico' ? <img alt="" src={destinationChain.logo} className="size-5 shrink-0 rounded-full" /> : '?'}</span>
                                            </div>
                                            <span className='truncate'>{destinationChain.name}</span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-[#00ff9d]" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0 z-100">
                                    <Command>
                                        <CommandInput placeholder="Search chains..." />
                                        <CommandList>
                                            <CommandEmpty>No chains found.</CommandEmpty>
                                            <CommandGroup>
                                                {chains.map((chain, index) => (
                                                    <CommandItem
                                                        key={chain.name}
                                                        value={chain.name}
                                                        onSelect={() => {
                                                            if (chain.id !== sourceChain.id) {
                                                                setDestinationChain(chain)
                                                                setDestinationTokens(tokens[index])
                                                                setTokenB(tokens[index][0])
                                                            }
                                                            setOpen2(false)
                                                        }}
                                                        className='cursor-pointer'
                                                    >
                                                        <div className="flex items-center">
                                                            <img alt="" src={chain.logo} className="size-5 shrink-0 rounded-full" />
                                                            <span className="ml-3 truncate">{chain.name}</span>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="p-3 rounded bg-[#0a0b1e]/50 border border-[#00ff9d]/10">
                        <div className="text-xs text-gray-500 mb-1">You send</div>
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                placeholder="0.0"
                                className="w-[140px] sm:w-[200px] bg-transparent border-none text-white text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto"
                                style={{ backgroundColor: "transparent" }}
                                value={depositValue}
                                onChange={(e) => setDepositValue(e.target.value)}
                            />
                            <Popover open={open3} onOpenChange={setOpen3}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 flex items-center justify-between h-10 cursor-pointer">
                                        <div className='gap-2 flex flex-row items-center justify-center'>
                                            <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                                <span className="text-[#00ff9d] text-xs">{tokenA.logo !== '../favicon.ico' ? <img alt="" src={tokenA.logo} className="size-5 shrink-0 rounded-full" /> : '?'}</span>
                                            </div>
                                            <span className='truncate'>{tokenA.name}</span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-[#00ff9d]" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0 z-100">
                                    <Command>
                                        <CommandInput placeholder="Search tokens..." />
                                        <CommandList>
                                            <CommandEmpty>No tokens found.</CommandEmpty>
                                            <CommandGroup>
                                                {sourceTokens.map(token => (
                                                    <CommandItem
                                                        key={token.name}
                                                        value={token.name}
                                                        onSelect={() => {
                                                            setTokenA(token)
                                                            setOpen3(false)
                                                        }}
                                                        className='cursor-pointer'
                                                    >
                                                        <div className="flex items-center">
                                                            <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                                            <span className="ml-3 truncate">{token.name}</span>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-xs">
                            <span />
                            <span className="text-gray-400">
                                {tokenA.name !== 'Choose Token' ? `${Number(sourceBalance).toFixed(4)} ${tokenA.name}` : '0.0000'}
                                <button
                                    onClick={() => {
                                        const truncated = Math.floor(Number(sourceBalance) * 10000) / 10000;
                                        setDepositValue(String(truncated));
                                    }}
                                    className="text-green-400 ml-2 border px-2 py-[4px] font-semibold hover:text-blue-500 transition-colors duration-150 cursor-pointer"
                                >
                                    MAX
                                </button>
                            </span>
                        </div>
                    </div>

                    <div className="p-3 rounded bg-[#0a0b1e]/50 border border-[#00ff9d]/10">
                        <div className="text-xs text-gray-500 mb-1">You receive</div>
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                placeholder="0.0"
                                className="w-[140px] sm:w-[200px] bg-transparent border-none text-white text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto"
                                style={{ backgroundColor: "transparent" }}
                                value={Number(depositValue) - Number(bridgeFee) > 0 ? Number(depositValue) - Number(bridgeFee) : ''}
                                readOnly
                            />
                            <Popover open={open4} onOpenChange={setOpen4}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 flex items-center justify-between h-10 cursor-pointer">
                                        <div className='gap-2 flex flex-row items-center justify-center'>
                                            <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                                <span className="text-[#00ff9d] text-xs">{tokenB.logo !== '../favicon.ico' ? <img alt="" src={tokenB.logo} className="size-5 shrink-0 rounded-full" /> : '?'}</span>
                                            </div>
                                            <span className='truncate'>{tokenB.name}</span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-[#00ff9d]" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0 z-100">
                                    <Command>
                                        <CommandInput placeholder="Search tokens..." />
                                        <CommandList>
                                            <CommandEmpty>No tokens found.</CommandEmpty>
                                            <CommandGroup>
                                                {destinationTokens.map(token => (
                                                    <CommandItem
                                                        key={token.name}
                                                        value={token.name}
                                                        onSelect={() => {
                                                            setTokenB(token)
                                                            setOpen4(false)
                                                        }}
                                                        className='cursor-pointer'
                                                    >
                                                        <div className="flex items-center">
                                                            <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                                            <span className="ml-3 truncate">{token.name}</span>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span />
                            <span className="text-gray-400 text-xs">{tokenB.name !== 'Choose Token' ? Number(destinationBalance).toFixed(4) + ' ' + tokenB.name : '0.0000'}</span>
                        </div>
                    </div>
                </div>

                {sourceChain.id === chainId ?
                    <>
                        {Number(depositValue) <= Number(reserve) ?
                            <Button
                                className="w-full py-6 px-8 mt-4 font-bold uppercase tracking-wider text-white relative overflow-hidden transition-all duration-300
                                bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800
                                hover:scale-[1.02] hover:custom-gradient hover:custom-text-shadow hover-effect
                                shadow-lg shadow-emerald-500/40
                                active:translate-y-[-1px] active:scale-[1.01] active:duration-100 cursor-pointer"
                                onClick={bridge}
                            >
                                Confirm
                            </Button> :
                            <Button disabled className="w-full py-6 px-8 mt-4 bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 cursor-pointer">Insufficient escrow</Button>
                        }
                    </> :
                    <>
                        {(sourceChain.id === 96 && destinationChain.id === 56) || (sourceChain.id === 56 && destinationChain.id === 96) ?
                            <Button disabled className="w-full py-6 px-8 mt-4 bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 cursor-pointer">Not available</Button> :
                            <Button disabled className="w-full py-6 px-8 mt-4 bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 cursor-pointer">Please switch chain</Button>
                        }
                    </>
                }

                <div className="mt-6 p-3 rounded border border-[#00ff9d]/10">
                    <div className="flex justify-between items-center mb-2 text-xs">
                        <div className="text-gray-400">Escrow Contract</div>
                        <div className="font-bold">{Intl.NumberFormat("en-US").format(Number(reserve))} {tokenB.name}</div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <div className="text-gray-400">Bridge Fee</div>
                        <div className="text-white">{bridgeFee} USDT/TX</div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
