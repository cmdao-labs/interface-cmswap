"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ErrorModal from "./error-modal";
import { useAccount } from "wagmi";
import { config } from "@/config/reown";
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, type WriteContractErrorType } from "@wagmi/core";
import { formatEther, encodeAbiParameters, keccak256 } from "viem";
import { chains } from "@/lib/chains";

const { 
  v3FactoryContract, 
  positionManagerContract, 
  erc20ABI, 
  v3PoolABI, 
  publicClient, 
  erc721ABI, 
  POSITION_MANAGER, 
  positionManagerCreatedAt, 
  StakingFactoryV3, 
  StakingFactoryV3Contract, 
  V3_STAKER, 
  v3StakerContract 
} = chains[25925];
import { useParams } from "next/navigation";

export default function StakingV3Modal({ open, onOpenChange, poolAddress, incentiveKey }: { open: boolean; onOpenChange: (v: boolean) => void; poolAddress?: `0x${string}`; incentiveKey?: { rewardToken: `0x${string}`; pool: `0x${string}`; startTime: bigint; endTime: bigint; refundee: `0x${string}` } }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null);
  const [txupdate, setTxupdate] = React.useState("");
  const { address } = useAccount();
  const [showDebug, setShowDebug] = React.useState(false);
  const [positions, setPositions] = React.useState<bigint[]>([]);
  const [positionImages, setPositionImages] = React.useState<Record<string, string>>({});
  const [stakedPositions, setStakedPositions] = React.useState<bigint[]>([]);
  const [rewardByToken, setRewardByToken] = React.useState<Record<string, number>>({});
  const [percentByToken, setPercentByToken] = React.useState<Record<string, number>>({});
  const [detailsByToken, setDetailsByToken] = React.useState<Record<string, { fee: number; tickLower: number; tickUpper: number; currentTick?: number; pool?: string }>>({});
  const [stakingTokenId, setStakingTokenId] = React.useState("");
  const [unstakeTokenId, setUnstakeTokenId] = React.useState("");
  const [allPending, setAllPending] = React.useState("");
  const [allStaker, setAllStaker] = React.useState("");
  const [currentIncentiveId, setCurrentIncentiveId] = React.useState<string>("");
  const [incentiveExists, setIncentiveExists] = React.useState<boolean | null>(null);
  const [totalRewardAmount, setTotalRewardAmount] = React.useState<bigint>(BigInt(0));
  const [now, setNow] = React.useState(Math.floor(Date.now() / 1000));

  React.useEffect(() => {
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const computeIncentiveId = (opts: { rewardToken: `0x${string}`; pool: `0x${string}`; startTime: bigint; endTime: bigint; refundee: `0x${string}` }): `0x${string}` => {
    const encoded = encodeAbiParameters(
      [
        { type: 'address' },
        { type: 'address' },
        { type: 'uint256' },
        { type: 'uint256' },
        { type: 'address' },
      ],
      [opts.rewardToken, opts.pool, opts.startTime, opts.endTime, opts.refundee]
    );
    return keccak256(encoded) as `0x${string}`;
  };

  // Determine active pool: prop > route param > fallback
  const params = useParams() as any;
  const routePool = params?.address ? (Array.isArray(params.address) ? params.address[0] : params.address) : undefined;
  const EFFECTIVE_POOL = (incentiveKey?.pool || poolAddress || routePool || '0x77069e705dce52ed903fd577f46dcdb54d4db0ac') as '0xstring';
  const KEY_REWARD = (incentiveKey?.rewardToken || '0xE7f64C5fEFC61F85A8b851d8B16C4E21F91e60c0') as '0xstring';
  const KEY_START = incentiveKey?.startTime ?? BigInt(1755589200);
  const KEY_END = incentiveKey?.endTime ?? BigInt(3270351988);
  const KEY_REFUNDEE = (incentiveKey?.refundee || '0x1fe5621152a33a877f2b40a4bb7bc824eebea1ea') as '0xstring';

  const stakeNft = async (_nftId: bigint) => {
    setIsLoading(true);
    try {
      if (incentiveExists === false) {
        setErrMsg(new Error("Incentive not found for current key. Please verify pool/time/refundee.") as unknown as WriteContractErrorType);
        setIsLoading(false);
        return;
      }
      // Pre-check token's actual pool matches the incentive pool
      try {
        const pos: any = await readContract(config, { ...positionManagerContract, functionName: 'positions', args: [_nftId] });
        const token0 = String(pos?.token0 || pos?.[2] || '') as `0x${string}`;
        const token1 = String(pos?.token1 || pos?.[3] || '') as `0x${string}`;
        const fee = Number(pos?.fee ?? pos?.[4] ?? 0);
        const tokenPool = await readContract(config, { ...v3FactoryContract, functionName: 'getPool', args: [token0, token1, fee] }) as `0x${string}`;
    /*     if (tokenPool.toLowerCase() !== (EFFECTIVE_POOL as string).toLowerCase()) {
          const err: any = new Error('Token pool does not match the selected incentive pool.');
          err.meta = { functionName: 'stakeToken', tokenId: _nftId.toString(), tokenPool, incentivePool: EFFECTIVE_POOL };
          setErrMsg(err as WriteContractErrorType);
          setIsLoading(false);
          return;
        } */
      } catch {}
      const { request: request1 } = await simulateContract(config, { ...erc721ABI, address: POSITION_MANAGER, functionName: 'safeTransferFrom', args: [address as '0xstring', StakingFactoryV3, _nftId] })
      const h = await writeContract(config, request1)
      await waitForTransactionReceipt(config, { hash: h })
      const { request: request2 } = await simulateContract(config, { 
          ...StakingFactoryV3Contract, 
          functionName: 'stakeToken',
          args: [{
              rewardToken: KEY_REWARD,
              pool: EFFECTIVE_POOL,
              startTime: KEY_START,
              endTime: KEY_END,
              refundee: KEY_REFUNDEE
          }, _nftId] 
      })
      const h2 = await writeContract(config, request2)
      await waitForTransactionReceipt(config, { hash: h2 })
      setTxupdate(h2)
    } catch (e) {
      setErrMsg(e as WriteContractErrorType)
    }
    setIsLoading(false)
  }

  const unstakeNft = async (_nftId: bigint) => {
    setIsLoading(true)
    let lastCall: any = null;
    try {
      // Use current incentive keys directly since we filtered for them
      const rewardToken = KEY_REWARD;
      const pool = EFFECTIVE_POOL;
      const startTime = KEY_START;
      const endTime = KEY_END;
      const refundee = KEY_REFUNDEE;
      
      const { request: request1 } = await simulateContract(config, { 
          ...StakingFactoryV3Contract, 
          functionName: 'unstakeToken',
          args: [{
              rewardToken,
              pool,
              startTime,
              endTime,
              refundee
          }, _nftId]
      })
      
      // Compute ID for error reporting
      const encoded = encodeAbiParameters(
        [
          { type: 'address' },
          { type: 'address' },
          { type: 'uint256' },
          { type: 'uint256' },
          { type: 'address' },
        ],
        [rewardToken, pool as unknown as `0x${string}`, startTime, endTime, refundee]
      );
      const id = keccak256(encoded);

      lastCall = {
        to: StakingFactoryV3Contract.address,
        functionName: 'unstakeToken',
        args: [{
          rewardToken,
          pool,
          startTime,
          endTime,
          refundee,
        }, _nftId],
        incentiveId: id,
        via: 'factory',
      };
      const h1 = await writeContract(config, request1)
      await waitForTransactionReceipt(config, { hash: h1 })
      const { request: request2 } = await simulateContract(config, { 
          ...StakingFactoryV3Contract, 
          functionName: 'withdrawToken',
          args: [_nftId, address as '0xstring', '0x'] 
      })
      lastCall = {
        to: StakingFactoryV3Contract.address,
        functionName: 'withdrawToken',
        args: [_nftId, address as '0xstring', '0x'],
        incentiveId: id,
        via: 'factory',
      };
      const h2 = await writeContract(config, request2)
      await waitForTransactionReceipt(config, { hash: h2 })
      setTxupdate(h2)
    } catch (e) {
      const err: any = e as any;
      const meta = {
        functionName: 'unstakeToken/withdrawToken',
        pool: (e as any)?.meta?.pool || undefined,
        tokenId: _nftId?.toString?.() ?? String(_nftId),
        args: (e as any)?.meta?.args || (e as any)?.args || (e as any)?.request?.args || undefined,
        lastCall: (typeof lastCall === 'object') ? lastCall : undefined,
      };
      setErrMsg(Object.assign(err || {}, { meta }) as WriteContractErrorType)
    }
    setIsLoading(false)
  }

  // Detect which contract currently holds the deposit for this token (factory or legacy staker)
  const detectDepositContract = async (tokenId: bigint): Promise<'factory' | 'staker' | null> => {
    try {
      const depF = await readContract(config, { ...StakingFactoryV3Contract, functionName: 'deposits', args: [tokenId] }) as any;
      const ownerF = (Array.isArray(depF) ? depF[0] : (depF?.owner ?? depF?.[0])) as string | undefined;
      if (ownerF && address && ownerF.toLowerCase() === address.toLowerCase()) return 'factory';
    } catch {}
    try {
      const depS = await readContract(config, { ...v3StakerContract, functionName: 'deposits', args: [tokenId] }) as any;
      const ownerS = (Array.isArray(depS) ? depS[0] : (depS?.owner ?? depS?.[0])) as string | undefined;
      if (ownerS && address && ownerS.toLowerCase() === address.toLowerCase()) return 'staker';
    } catch {}
    return null;
  };

  // Rescue withdraw for cases where safeTransferFrom succeeded but stakeToken failed (no stake recorded)
  const directWithdraw = async (tokenId: bigint) => {
    setIsLoading(true);
    let lastCall: any = null;
    try {
      const holder = await detectDepositContract(tokenId);
      if (!holder) {
        setErrMsg(new Error('No deposit found on staker for this token.') as unknown as WriteContractErrorType);
        setIsLoading(false);
        return;
      }
      const stakeContract = holder === 'factory' ? StakingFactoryV3Contract : v3StakerContract;
      const { request } = await simulateContract(config, { ...stakeContract, functionName: 'withdrawToken', args: [tokenId, address as '0xstring', '0x'] });
      lastCall = { to: (stakeContract as any).address, functionName: 'withdrawToken', args: [tokenId, address, '0x'], via: holder };
      const h = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash: h });
      setTxupdate(h);
    } catch (e) {
      const err: any = e as any;
      const meta = { functionName: 'withdrawToken', tokenId: tokenId.toString(), lastCall };
      setErrMsg(Object.assign(err || {}, { meta }) as WriteContractErrorType);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    const fetchPositions = async () => {
      if (!address) return;
      let computedId: `0x${string}` | undefined;
      // Compute incentiveId for current key and check existence
      try {
        const rewardToken = KEY_REWARD;
        const pool = EFFECTIVE_POOL;
        const startTime = KEY_START;
        const endTime = KEY_END;
        const refundee = KEY_REFUNDEE;
        const encoded = encodeAbiParameters(
          [
            { type: 'address' },
            { type: 'address' },
            { type: 'uint256' },
            { type: 'uint256' },
            { type: 'address' },
          ],
          [rewardToken, pool as unknown as `0x${string}`, startTime, endTime, refundee]
        );
        const id = keccak256(encoded);
        computedId = id;
        setCurrentIncentiveId(id);
        const incentiveStat = await readContract(config, { ...StakingFactoryV3Contract, functionName: 'incentives', args: [id as '0xstring'] }) as any;
        // Heuristic: treat exists if any field non-zero. Prefer numberOfStakes (index 2) or totalReward (index 0)
        const exists = Boolean(incentiveStat) && (Number(incentiveStat[0] ?? 0) > 0 || Number(incentiveStat[2] ?? 0) >= 0);
        setIncentiveExists(exists);
        if (incentiveStat) {
          if (incentiveStat[2] !== undefined) setAllStaker(String(incentiveStat[2]));
          if (incentiveStat[0] !== undefined) setTotalRewardAmount(BigInt(incentiveStat[0]));
        }
      } catch {
        setIncentiveExists(false);
      }
      const balanceOf = await readContract(config, { ...positionManagerContract, functionName: 'balanceOf', args: [address as '0xstring'] })
      const init: any = { contracts: [] };
      for (let i = 0; i < Number(balanceOf); i++) {
        init.contracts.push({ ...positionManagerContract, functionName: 'tokenOfOwnerByIndex', args: [address as '0xstring', i] })
      }
      const tokenIds = await readContracts(config, init);
      const rawIds = tokenIds.map(t => (t.result as bigint)).filter(Boolean) as bigint[];
      
      // Filter owned positions by pool
      const filteredPositions: bigint[] = [];
      if (rawIds.length > 0) {
        const posDetails = await readContracts(config, {
          contracts: rawIds.map(id => ({ ...positionManagerContract, functionName: 'positions', args: [id] }))
        });
        for (let i = 0; i < rawIds.length; i++) {
          const pos: any = posDetails[i].result;
          if (!pos) continue;
          const token0 = String(pos?.token0 || pos?.[2] || '') as `0x${string}`;
          const token1 = String(pos?.token1 || pos?.[3] || '') as `0x${string}`;
          const fee = Number(pos?.fee ?? pos?.[4] ?? 0);
          try {
             const pool = await readContract(config, { ...v3FactoryContract, functionName: 'getPool', args: [token0, token1, fee] }) as string;
             if (pool.toLowerCase() === (EFFECTIVE_POOL as string).toLowerCase()) {
               filteredPositions.push(rawIds[i]);
             }
          } catch {}
        }
      }
      setPositions(filteredPositions);

      // Image fetching moved to separate effect that watches owned + staked

      const _eventMyNftStaking = (await publicClient.getContractEvents({
        ...erc721ABI,
        address: POSITION_MANAGER,
        eventName: 'Transfer',
        args: { to: StakingFactoryV3 },
        fromBlock: positionManagerCreatedAt,
        toBlock: 'latest'
      })).map(obj => obj.args.tokenId)
      const eventMyNftStaking = [...new Set(_eventMyNftStaking)]
      const checkMyNftOwner = await readContracts(config, { contracts: eventMyNftStaking.map(obj => ({ ...StakingFactoryV3Contract, functionName: 'deposits', args: [obj] })) })
      
      // Filter staked positions by owner AND incentive
      const validStaked: bigint[] = [];
      const potentialStaked = eventMyNftStaking.filter((obj, index) => {
        const res = checkMyNftOwner[index].result as unknown as [string, bigint, bigint, bigint][]
        return res && res[0] && res[0].toString().toUpperCase() === address?.toUpperCase()
      }) as bigint[];

      if (potentialStaked.length > 0 && computedId) {
         const stakeChecks = await readContracts(config, {
            contracts: potentialStaked.map(tid => ({ ...StakingFactoryV3Contract, functionName: 'stakes', args: [tid, computedId!] }))
         });
         for(let i=0; i<potentialStaked.length; i++) {
            const st = stakeChecks[i].result;
            let isStaked = false;
            if (Array.isArray(st)) {
               isStaked = st.some((v) => { try { return (typeof v === 'bigint' && v > BigInt(0)) || (typeof v === 'number' && v > 0); } catch { return false; } });
            } else if (st && typeof st === 'object') {
               isStaked = Object.values(st).some((v: any) => { try { return (typeof v === 'bigint' && v > BigInt(0)) || (typeof v === 'number' && v > 0); } catch { return false; } });
            }
            if (isStaked) validStaked.push(potentialStaked[i]);
         }
      }

      setStakedPositions(validStaked)
      const checkedMyNftStaking = validStaked;
      const myReward = await readContracts(config, { contracts: checkedMyNftStaking.map((obj) => ({ 
        ...StakingFactoryV3Contract, functionName: 'getRewardInfo', args: [{
          rewardToken: KEY_REWARD,
          pool: EFFECTIVE_POOL,
          startTime: KEY_START,
          endTime: KEY_END,
          refundee: KEY_REFUNDEE
        }, obj] })) })
      let _allPending = 0
      let _allPendingWei = BigInt(0)
      const _rewardByToken: Record<string, number> = {}
      for (let i = 0; i < myReward.length; i++) {
        const item: any = myReward[i];
        if (!item || item.status !== 'success' || item.result === undefined) continue;
        const result: any = item.result;
        let bn = BigInt(0);
        if (Array.isArray(result) && result.length > 0 && typeof result[0] === 'bigint') bn = result[0];
        else if (typeof result === 'bigint') bn = result;
        else if (result && typeof result === 'object' && typeof (result[0] as any) === 'bigint') bn = (result[0] as any);
        _allPendingWei += bn
        const val = Number(formatEther(bn));
        _allPending += val;
        const tid = (checkedMyNftStaking[i] as bigint)?.toString?.() ?? '';
        if (tid) _rewardByToken[tid] = val;
      }
      setAllPending(formatEther(_allPendingWei))
      setRewardByToken(_rewardByToken)
      const _percentByToken: Record<string, number> = {}
      Object.entries(_rewardByToken).forEach(([k, v]) => {
        _percentByToken[k] = _allPending > 0 ? (v / _allPending) * 100 : 0
      })
      setPercentByToken(_percentByToken)

      // allStaker already set from incentive check above if available
    };
    if (open) fetchPositions();
  }, [open, address, txupdate]);

  // Fetch tokenURIs for both owned and staked positions to ensure previews show after staking
  React.useEffect(() => {
    const run = async () => {
      if (!open) return;
      const all = Array.from(new Set([...(positions || []), ...(stakedPositions || [])].map(String)));
      if (all.length === 0) {
        setPositionImages({});
        return;
      }
      try {
        const uriReq: any = { contracts: all.map((s) => ({ ...positionManagerContract, functionName: 'tokenURI', args: [BigInt(s)] })) };
        const uriRes = await readContracts(config, uriReq);
        const decodeTokenURI = (uri: string): any => {
          try {
            if (uri.startsWith('data:application/json;base64,')) {
              const json = atob(uri.split(',')[1]);
              return JSON.parse(json);
            }
            if (uri.startsWith('data:application/json;utf8,')) {
              const json = decodeURIComponent(uri.split(',')[1]);
              return JSON.parse(json);
            }
            if (uri.startsWith('data:application/json,')) {
              const json = decodeURIComponent(uri.split(',')[1]);
              return JSON.parse(json);
            }
            if (uri.trim().startsWith('{')) {
              return JSON.parse(uri);
            }
          } catch {}
          return null;
        };
        const imgs: Record<string, string> = {};
        uriRes.forEach((r: any, idx: number) => {
          const uri = String(r.result || '');
          const meta = decodeTokenURI(uri);
          const img = (meta?.image as string | undefined) || '';
          if (img) imgs[all[idx]] = img;
        });
        setPositionImages(imgs);
      } catch {
        // ignore preview errors
      }
    };
    run();
  }, [open, positions, stakedPositions]);

  React.useEffect(() => {
    const fetchDetails = async () => {
      const allIds: bigint[] = Array.from(new Set([...(positions || []), ...(stakedPositions || [])]));
      if (allIds.length === 0) {
        setDetailsByToken({});
        return;
      }
      try {
        const posReq: any = { contracts: allIds.map((id) => ({ ...positionManagerContract, functionName: 'positions', args: [id] })) };
        const posRes = await readContracts(config, posReq);
        const baseDetails: { id: string; fee: number; tickLower: number; tickUpper: number; token0: string; token1: string }[] = posRes.map((r: any, idx: number) => {
          const p: any = r.result;
          return {
            id: allIds[idx].toString(),
            fee: Number(p?.fee ?? 0),
            tickLower: Number(p?.tickLower ?? 0),
            tickUpper: Number(p?.tickUpper ?? 0),
            token0: String(p?.token0 ?? '0x0000000000000000000000000000000000000000'),
            token1: String(p?.token1 ?? '0x0000000000000000000000000000000000000000'),
          };
        });
        const poolReq: any = { contracts: baseDetails.map((d) => ({ ...v3FactoryContract, functionName: 'getPool', args: [d.token0 as '0xstring', d.token1 as '0xstring', d.fee] })) };
        const poolRes = await readContracts(config, poolReq);
        const slotReq: any = { contracts: poolRes.map((r: any) => ({ abi: (v3PoolABI as any).abi, address: String(r.result || '0x0000000000000000000000000000000000000000') as '0xstring', functionName: 'slot0' })) };
        const slotRes = await readContracts(config, slotReq);
        const map: Record<string, { fee: number; tickLower: number; tickUpper: number; currentTick?: number; pool?: string }> = {};
        baseDetails.forEach((d, i) => {
          const slot: any = slotRes[i]?.result;
          map[d.id] = {
            fee: d.fee,
            tickLower: d.tickLower,
            tickUpper: d.tickUpper,
            currentTick: slot ? Number(slot[1]) : undefined,
            pool: String(poolRes[i]?.result || '').toLowerCase(),
          };
        });
        setDetailsByToken(map);
      } catch {}
    };
    if (open) fetchDetails();
  }, [open, positions, stakedPositions]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
      <DialogContent className="w-[90vw] max-w-[1000px] sm:max-w-[1000px] h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Uniswap V3 Staking</DialogTitle>
        </DialogHeader>
        <div className="h-full w-full bg-gradient-to-br from-slate-900 via-black to-emerald-950 text-white overflow-auto">
          {isLoading && (
            <div className="fixed inset-0 z-[999] backdrop-blur-md bg-black/20 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
            </div>
          )}
          <div className="container mx-auto p-4 md:p-6">
            <div className="mb-4 bg-slate-900/50 border border-slate-700/50 rounded-md p-4 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 font-semibold uppercase tracking-wider">Incentive Data</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                <div><span className="text-gray-500">Pool:</span> <span className="break-all font-mono text-gray-300">{EFFECTIVE_POOL}</span></div>
                <div><span className="text-gray-500">Reward:</span> <span className="break-all font-mono text-gray-300">{KEY_REWARD}</span></div>
                <div><span className="text-gray-500">Start:</span> <span className="text-gray-300">{Number(KEY_START)} ({new Date(Number(KEY_START) * 1000).toLocaleString()})</span></div>
                <div><span className="text-gray-500">End:</span> <span className="text-gray-300">{Number(KEY_END)} ({new Date(Number(KEY_END) * 1000).toLocaleString()})</span></div>
                
                {(() => {
                  const duration = Number(KEY_END - KEY_START);
                  const hourlyRewardWei = duration > 0 ? (totalRewardAmount * BigInt(3600)) / BigInt(duration) : BigInt(0);
                  const isStarted = BigInt(now) >= KEY_START;
                  const isEnded = BigInt(now) >= KEY_END;
                  let timeLeft = BigInt(0);
                  let label = "";
                  
                  if (!isStarted) {
                    timeLeft = KEY_START - BigInt(now);
                    label = "Starting in";
                  } else if (!isEnded) {
                    timeLeft = KEY_END - BigInt(now);
                    label = "Remaining Time";
                  } else {
                    label = "Ended";
                  }

                  const days = timeLeft / BigInt(86400);
                  const hours = (timeLeft % BigInt(86400)) / BigInt(3600);
                  const minutes = (timeLeft % BigInt(3600)) / BigInt(60);
                  const seconds = timeLeft % BigInt(60);
                  const timeString = timeLeft > 0 ? `${days}d ${hours}h ${minutes}m ${seconds}s` : "0s";

                  return (
                    <>
                      <div><span className="text-gray-500">Hourly Reward:</span> <span className="text-gray-300">{formatEther(hourlyRewardWei)}</span></div>
                      <div><span className="text-gray-500">Total Reward:</span> <span className="text-gray-300">{formatEther(totalRewardAmount)}</span></div>
                      <div className="sm:col-span-2 mt-2 pt-2 border-t border-slate-800">
                        <span className="text-gray-500">{label}:</span> <span className="text-emerald-400 font-mono text-sm ml-2">{timeString}</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {incentiveExists === false && (
              <div className="mb-3 bg-red-900/20 border border-red-700/40 text-red-300 text-xs rounded-md px-3 py-2">
                Incentive not found for current key. Please verify pool/time/refundee.
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">My Reward Pending</div>
                <div className="text-2xl font-light">{allPending}</div>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Total Stakers</div>
                <div className="text-2xl font-light">{allStaker}</div>
              </div>
            </div>
            
            {/* Conditional Rendering for Positions */}
            {(() => {
               const isStarted = BigInt(now) >= KEY_START;
               if (!isStarted) {
                 const timeLeft = KEY_START - BigInt(now);
                 const days = timeLeft / BigInt(86400);
                 const hours = (timeLeft % BigInt(86400)) / BigInt(3600);
                 const minutes = (timeLeft % BigInt(3600)) / BigInt(60);
                 const seconds = timeLeft % BigInt(60);
                 return (
                   <div className="mt-8 p-8 bg-slate-900/40 border border-slate-700/30 rounded-xl flex flex-col items-center justify-center text-center">
                     <div className="text-gray-400 uppercase tracking-widest text-sm mb-4">Staking Starts In</div>
                     <div className="text-4xl md:text-6xl font-thin font-mono text-emerald-400">
                       {Number(days)}d {Number(hours)}h {Number(minutes)}m {Number(seconds)}s
                     </div>
                   </div>
                 );
               }

               return (
                <div className="mt-6">
                  <div className="text-sm text-gray-300 mb-2">My Position Token IDs</div>
                  {positions.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                      {positions.map((id) => {
                        const key = id.toString();
                        const src = positionImages[key];
                        const d = detailsByToken[key];
                        return (
                          <div key={`img-${key}`} className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-lg p-2 flex flex-col text-[10px]">
                            {src ? (
                              <img src={src} alt={`Position #${key}`} className="w-full h-24 object-contain rounded" />
                            ) : (
                              <div className="text-gray-500 text-[10px] py-4 text-center">No preview</div>
                            )}
                            <div className="mt-1 text-[10px] text-gray-300">#{key}</div>
                            <div className="mt-1 text-[10px] text-gray-400">Fee: {d?.fee ?? '-'}</div>
                            <div className="mt-1 text-[10px] text-gray-400">Current: {d?.currentTick ?? '-'} | Min: {d?.tickLower ?? '-'} | Max: {d?.tickUpper ?? '-'}</div>
                            <div className="mt-2">
                              <Button size="sm" className="w-full py-2 text-xs sm:text-sm" onClick={() => stakeNft(BigInt(key))}>Stake</Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {stakedPositions.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-300 mb-2">My Staked Positions</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {stakedPositions.map((id) => {
                          const key = id.toString();
                          const src = positionImages[key];
                          const d = detailsByToken[key];
                          const pct = percentByToken[key] ?? 0;
                          return (
                            <div key={`stk-${key}`} className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-lg p-2 flex flex-col text-[10px]">
                              {src ? (
                                <img src={src} alt={`Position #${key}`} className="w-full h-24 object-contain rounded" />
                              ) : (
                                <div className="text-gray-500 text-[10px] py-4 text-center">No preview</div>
                              )}
                              <div className="mt-1 text-[10px] text-gray-300">#{key}</div>
                              <div className="mt-1 text-[10px] text-gray-400">Fee: {d?.fee ?? '-'}</div>
                              <div className="mt-1 text-[10px] text-gray-400">Current: {d?.currentTick ?? '-'} | Min: {d?.tickLower ?? '-'} | Max: {d?.tickUpper ?? '-'}</div>
                              <div className="mt-1 text-[10px] text-emerald-400">Pending reward: {pct.toFixed(2)}%</div>
                              <div className="mt-2 flex flex-col sm:grid sm:grid-cols-2 gap-2">
                                <Button size="sm" variant="outline" className="w-full py-2 text-xs" onClick={() => unstakeNft(BigInt(key))}>
                                  <span className="hidden sm:inline">Unstake + Withdraw</span>
                                  <span className="sm:hidden">Unstake</span>
                                </Button>
                                <Button size="sm" variant="ghost" className="w-full py-2 text-xs" onClick={() => directWithdraw(BigInt(key))}>
                                  <span className="hidden sm:inline">Direct Withdraw</span>
                                  <span className="sm:hidden">Withdraw</span>
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
               );
            })()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
