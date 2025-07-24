'use client'
import React, { useState, useRef } from 'react';
import { ChevronDown, Search, Plus, Calendar, Clock, ArrowRight, Check, Settings, Wallet } from 'lucide-react';
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction, type WriteContractErrorType } from '@wagmi/core'
import { config } from '@/app/config'
import { erc20Abi } from 'viem'
import {tokens} from '@/app/lib/25925'
import { formatEther, parseEther } from 'viem'
import Input from '../ui/input';

const CreateEarnProgram = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  type Pool = { id: number; name: string; apr: string; tvl: string; volume: string };
  const [selectedPool, setSelectedPool] = React.useState<Pool | null>(null);
  const [selectToken, setSelectToken] = React.useState<string>('');
  const [selectTokenInfo,setSelectTokenInfo] = React.useState<{name: string, symbol: string, totalSupply: string} | null>(null);
  const [rewardTokenInfo,setRewardTokenInfo] = React.useState<{name: string, symbol: string, totalSupply: string} | null>(null);
  type ChainKey = keyof typeof chains;
  const [selectedChain, setSelectedChain] = React.useState<ChainKey>('kubtestnet');
  const [rewardToken, setRewardToken] = React.useState('');
  const [rewardTokenSymbol, setRewardTokenSymbol] = React.useState('');
  const [rewardAmount, setRewardAmount] = React.useState('');
  const [duration, setDuration] = React.useState('7');
  const [startDate, setStartDate] = React.useState('');
  const [stakingType, setStakingType] = React.useState<string | null>(null);
  const [poolFees, setPoolFees] = React.useState<string[]>([]);
  const [selectLockOption,setSelectLockOption] = React.useState('');
  const [singleUnlockTime, setSingleUnlockTime] = React.useState("");
  const [multiLocks, setMultiLocks] = React.useState([{ time: "", multiplier: "" }]);
  const [customDuration, setCustomDuration] = useState("");

  const rewardTokenRef = React.useRef<HTMLInputElement>(null);
  const rewardAmountRef =  React.useRef<HTMLInputElement>(null);
  const unlockRef = React.useRef<HTMLInputElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const customDurationRef = React.useRef<HTMLInputElement>(null);
  const fees = ['100', '500', '3000', '10000'];
  const effectiveDuration = duration === "-" ? customDuration : duration;

  const toggleFee = (fee: any) => {
    setPoolFees(prev => 
      prev.includes(fee) 
        ? prev.filter(f => f !== fee) 
        : [...prev, fee]              
    );
  };

  React.useEffect(()=>{
    console.log("Status",poolFees)
  },[poolFees])


  // Chain configurations
  const chains = {
    kubtestnet: {
      name: 'kub testnet',
      color: 'rgb(20, 184, 166)', // teal
      accent: 'border-teal-400',
      bg: 'bg-teal-900/20',
      text: 'text-teal-400'
    }
  };
  const currentTheme = chains[selectedChain as ChainKey];

  const mockPools = [
    { id: 1, name: 'tKKUB-KUSDT', apr: '12.5%', tvl: '$2.4M', volume: '$890K' },
  ];

  const steps = [
    { number: 1, title: 'Select Staking Type', description: 'Choose staking program type' },
    { number: 2, title: 'Select Pool', description: 'Choose a liquidity pool' },
    { number: 3, title: 'Add Reward', description: 'Set rewards and period' },
    { number: 4, title: 'Review', description: 'Confirm farm details' }
  ];

  const stakingTypes = [
    {
      name: 'Token Staking',
      description: 'Stake Tokens or LP Tokens to earn rewards. Suitable for users seeking flexibility in staking options. Supports multiple staking modes: No Lock (withdraw anytime), Fixed Lock (lock tokens for a set period), and Multiple Lock (choose custom lock periods with reward multipliers based on lock duration). Ideal for users who want to maximize returns with tailored lock-in strategies.'
    },
    {
      name: 'Concentrate Liquidity Staking',
      description: 'Stake NFT-based Concentrated Liquidity V3 positions to earn rewards. Supports only No Lock staking, allowing withdrawal at any time. Users can specify token pairs and fee tiers for farming. Perfect for advanced users leveraging concentrated liquidity pools to optimize capital efficiency.'
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectToken(value);
    if (value.length === 42) {
      fetchStakedTokenData(value);
    }
  }

  const fetchStakedTokenData = async (tokenAddress: string) => {
      if (!tokenAddress) return;

      try {
        const result = await readContracts(config, {
          contracts: [
            { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'name' },
            { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'symbol' },
            { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'totalSupply' }
          ]
        });

        if (
          result[0]?.status === 'success' &&
          result[1]?.status === 'success' &&
          result[2]?.status === 'success' &&
          result[0].result !== undefined &&
          result[1].result !== undefined &&
          result[2].result !== undefined
        ) {
          setSelectTokenInfo({
            name: String(result[0].result),
            symbol: String(result[1].result),
            totalSupply: formatEther(result[2].result),
          });
        }
      } catch (error) {
        console.error('Error fetching staked token data:', error);
      }
    }
  const fetchRewardTokenData = async (tokenAddress: string) => {
      if (!tokenAddress) return;

      try {
        const result = await readContracts(config, {
          contracts: [
            { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'name' },
            { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'symbol' },
            { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'totalSupply' }
          ]
        });

        if (
          result[0]?.status === 'success' &&
          result[1]?.status === 'success' &&
          result[2]?.status === 'success' &&
          result[0].result !== undefined &&
          result[1].result !== undefined &&
          result[2].result !== undefined
        ) {
          setRewardTokenInfo({
            name: String(result[0].result),
            symbol: String(result[1].result),
            totalSupply: formatEther(result[2].result),
          });
        }
      } catch (error) {
        console.error('Error fetching staked token data:', error);
      }
    }


  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step.number 
              ? `${currentTheme.accent} ${currentTheme.bg}` 
              : 'border-gray-600 bg-gray-800'
          }`}>
            {currentStep > step.number ? (
              <Check className={`w-5 h-5 ${currentTheme.text}`} />
            ) : (
              <span className={`text-sm font-medium ${
                currentStep >= step.number ? currentTheme.text : 'text-gray-400'
              }`}>
                {step.number}
              </span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${
              currentStep > step.number ? currentTheme.accent : 'bg-gray-600'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const ChainSelector = () => (
    <div className="flex gap-2 mb-6">
      {Object.entries(chains).map(([key, chain]) => (
        <button
          key={key}
          onClick={() => setSelectedChain(key as ChainKey)}
          className={`px-4 py-2 rounded-lg border transition-all ${
            selectedChain === key 
              ? `${chain.accent} ${chain.bg} ${chain.text}` 
              : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
          }`}
        >
          {chain.name}
        </button>
      ))}
    </div>
  );

  React.useEffect(()=>{
    const fetch = async () => {
        try {
          const result = await readContracts(config, {
            contracts: [
              { abi: erc20Abi, address: rewardToken as '0xstring', functionName: 'symbol' }
            ]
          });
          if (result[0]?.status === 'success' && result[0].result !== undefined) {
            setRewardTokenSymbol(result[0].result);
          }
        } catch (error) {
          
        }
    } 
    fetch(); 
  },[rewardToken])

  

  const SelectStakingTypeStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Select Staking Type</h2>
        <p className="text-gray-400">Choose the type of staking program you want to create</p>
      </div>

      <div className="space-y-3">
        {stakingTypes.map((type) => (
          <div
            key={type.name}
            onClick={() => setStakingType(type.name)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              stakingType === type.name 
                ? `${currentTheme.accent} ${currentTheme.bg}` 
                : 'border-gray-600 bg-gray-800 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">{type.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{type.description}</p>
              </div>
              {stakingType === type.name && (
                <Check className={`w-5 h-5 ${currentTheme.text}`} />
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => stakingType && setCurrentStep(2)}
        disabled={!stakingType}
        className={`w-full py-3 rounded-lg font-medium transition-all ${
          stakingType
            ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  );

  const SelectPoolStep = () => (

    stakingType === 'Token Staking' ? (
      <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Select Staked Token</h2>
      </div>

<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
  
  <Input
  value={selectToken}
  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSelectToken(e.target.value)}
  placeholder="Stake Token Address"
  icon={Search}
  label="Stake Token"
/>

</div>

    
      <div className="space-y-3">
        {tokens.map((token) => (
          token.value.length === 42 && (
          <div
            key={token.value}
            onClick={() => {
              setSelectToken(token.value);
              fetchStakedTokenData(token.value)
            }}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectToken === token.value 
                ? `${currentTheme.accent} ${currentTheme.bg}` 
                : 'border-gray-600 bg-gray-800 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <img src={token.logo || '/default2.png'} alt={token.name} className="w-8 h-8 rounded-full" />
              <div>
                <h3 className="font-medium text-white">{token.name}</h3>
                <p className="text-sm text-gray-400">Token Address: {token.value}</p>
              </div>
            </div>
          </div>
          )
          
        ))}
      </div>
      <div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
          <h3 className={`font-medium ${currentTheme.text} mb-3`}>Your Staked Token Infomation</h3>
          <div className="grid grid-span gap-4 text-sm">
            <div>
              <span className="text-gray-400">Token Name:</span>
              <span className="text-white ml-2">{selectTokenInfo?.name ? selectTokenInfo.name : 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Token Supply:</span>
              <span className="text-white ml-2">{selectTokenInfo?.totalSupply ? parseFloat(selectTokenInfo.totalSupply).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Token Symbol:</span>
              <span className="text-white ml-2">{selectTokenInfo?.symbol ? selectTokenInfo.symbol : 'N/A'}</span>
            </div>
          </div>
        </div>

      <div className="space-y-3">
        
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep(1)}
          className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => selectToken && setCurrentStep(3)}
          disabled={!selectToken}
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
            selectToken
              ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
    ) : (
      <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Select Eligible Pool</h2>
        <p className="text-gray-400">Choose a eligible liquidity pool to create farming rewards</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search pools..."
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
        />
      </div>

      <div className="space-y-3">
        {mockPools.map((pool) => (
          <div
            key={pool.id}
            onClick={() => setSelectedPool(pool)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedPool?.id === pool.id 
                ? `${currentTheme.accent} ${currentTheme.bg}` 
                : 'border-gray-600 bg-gray-800 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{pool.name.slice(0, 2)}</span>
                </div>
                <div>
                  <h3 className="font-medium text-white">{pool.name}</h3>
                  <p className="text-sm text-gray-400">Liquidity Pool</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-400">APR: <span className={currentTheme.text}>{pool.apr}</span></span>
                  <span className="text-gray-400">TVL: <span className="text-white">{pool.tvl}</span></span>
                </div>
                <p className="text-sm text-gray-400 mt-1">24h Vol: {pool.volume}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

<div className="w-full space-y-4">
  {/* Section: Header */}
  <div>
    <h2 className="text-lg font-semibold">Eligible Liquidity Fees</h2>
    <p className="text-sm text-muted-foreground">
      Please select one or more acceptable fee tiers for this program.
    </p>
  </div>

  {/* Section: Fee Options */}
  <div className="flex flex-wrap gap-2">
    {fees.map((fee) => {
      const selected = poolFees.includes(fee);
      return (
        <button
          key={fee}
          onClick={() => toggleFee(fee)}
          className={`
            px-4 py-2 rounded-full border text-sm transition
            ${selected
              ? `${currentTheme.bg} ${currentTheme.text} ring-2 ring-offset-1 ring-primary`
              : `bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground`}
          `}
        >
          {Number(fee) / 10000}%
        </button>
      );
    })}
  </div>

  {/* Section: Summary */}
  <p className="text-sm text-muted-foreground">
    Selected {poolFees.length} fee tier{poolFees.length !== 1 && 's'}.
  </p>
</div>


      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep(1)}
          className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => selectedPool && setCurrentStep(3)}
          disabled={!selectedPool}
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
            selectedPool
              ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
    ) 
    
  );

  const AddRewardStep = () => (
    stakingType === 'Token Staking' ? (
      <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Add Reward</h2>
        <p className="text-gray-400">Configure reward token and farming period</p>
      </div>

      <div className="grid grid-span gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Reward Token</label>
            <div className="relative">
              <input
                ref={rewardTokenRef}
                type="text"
                placeholder="Token contract address"
                value={rewardToken}
                onChange={(e) => {
                  setRewardToken(e.target.value)
                  if (e.target.value.length === 42) {
                    fetchRewardTokenData(e.target.value);
                  }
                }}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
              />
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>

            <div className={`p-4 mt-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
          <h3 className={`font-medium ${currentTheme.text} mb-3`}>Reward Token Infomation</h3>
          <div className="grid grid-span gap-4 text-sm">
            <div>
              <span className="text-gray-400">Token Name:</span>
              <span className="text-white ml-2">{rewardTokenInfo?.name ? rewardTokenInfo.name : 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Token Supply:</span>
              <span className="text-white ml-2">{rewardTokenInfo?.totalSupply ? parseFloat(rewardTokenInfo.totalSupply).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Token Symbol:</span>
              <span className="text-white ml-2">{rewardTokenInfo?.symbol ? rewardTokenInfo.symbol : 'N/A'}</span>
            </div>
          </div>
        </div>
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Total Reward Amount (Ether)</label>
            <input
              ref={rewardAmountRef}
              type="number"
              placeholder="0.00"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>

<div className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">Lock Options</label>

    <div className="space-y-3">
      {/* No Lock */}
      <div className={`p-4 rounded-lg border ${selectLockOption === '0' ? currentTheme.bg : 'bg-muted'}`} onClick={()=> setSelectLockOption('0')}>
        <div className="font-medium text-foreground">No Lock</div>
        <p className="text-sm text-muted-foreground">
          Users can withdraw staked tokens at any time.
        </p>
      </div>

      {/* Single Lock Time */}
      <div className={`p-4 rounded-lg border ${selectLockOption === '1' ? currentTheme.bg : 'bg-muted'}`} onClick={()=> setSelectLockOption('1')}>
        <div className="font-medium text-foreground">Single Lock Time</div>
        <p className="text-sm text-muted-foreground">
          Users can withdraw their staked tokens only after the unlock time set by the creator.
        </p>
      </div>

      {/* Multiple Lock Time */}
      <div className={`p-4 rounded-lg border ${selectLockOption === '2' ? currentTheme.bg : 'bg-muted'}`} onClick={()=> setSelectLockOption('2')}>
        <div className="font-medium text-foreground">Multiple Lock Time</div>
        <p className="text-sm text-muted-foreground">
          Users can choose from multiple lock durations predefined by the creator. The creator can assign different reward multipliers based on the selected duration.
        </p>
      </div>
    </div>
  </div>
    {selectLockOption === "1" && (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Unlock Time</label>
        <input
          type="number"
          ref={unlockRef}
          placeholder="Enter unlock time (in seconds)"
          className="w-full p-2 rounded-md border bg-background text-foreground"
          value={singleUnlockTime}
          onChange={(e) => setSingleUnlockTime(e.target.value)}
        />
      </div>
    )}
   {selectLockOption === "2" && (
  <div className="space-y-4">
    <label className="block text-sm font-semibold text-foreground">
      Multiple Lock Options
    </label>

    {multiLocks.map((item, index) => (
      <div
        key={index}
        className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-muted/30 p-4 rounded-lg border"
      >
        {/* Unlock Time */}
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-foreground mb-1">
            Unlock Time (seconds)
          </label>
          <input
            type="number"
            placeholder="e.g., 3600"
            className="w-full p-2 rounded-md border bg-background text-foreground"
            value={item.time}
            ref={unlockRef}
            onChange={(e) => {
              const updated = [...multiLocks];
              updated[index].time = e.target.value;
              setMultiLocks(updated);
            }}
          />
        </div>

        {/* Multiplier */}
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-foreground mb-1">
            Power Multiplier (%)
          </label>
          <input
            type="number"
            placeholder="e.g., 80 or 120"
            className="w-full p-2 rounded-md border bg-background text-foreground"
            value={item.multiplier}
            onChange={(e) => {
              const updated = [...multiLocks];
              updated[index].multiplier = e.target.value;
              setMultiLocks(updated);
            }}
          />
        </div>

        {/* Delete button */}
        <button
          type="button"
          className="mt-2 md:mt-6 text-sm text-red-500 hover:text-red-700"
          onClick={() => {
            const updated = multiLocks.filter((_, i) => i !== index);
            setMultiLocks(updated);
          }}
        >
          🗑 Remove
        </button>
      </div>
    ))}

    {/* Add More Button */}
    <button
      type="button"
      className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      onClick={() => setMultiLocks([...multiLocks, { time: "", multiplier: "" }])}
    >
      + Add
    </button>
  </div>
)}



</div>


    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Reward Duration (Days)
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
        >
          <option value="7">7 Days</option>
          <option value="14">14 Days</option>
          <option value="30">30 Days</option>
          <option value="90">90 Days</option>
          <option value="365">365 Days</option>
          <option value="-">Custom Days</option>
        </select>

        {/* แสดง input เมื่อเลือก Custom */}
        {duration === "-" && (
          <input
            type="number"
            min={1}
            placeholder="Enter custom days"
            value={customDuration}
            ref={customDurationRef}
            onChange={(e) => setCustomDuration(e.target.value)}
            className="mt-2 w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
        />
      </div>

      {/* แสดงค่า duration จริง (optional) */}
      <div className="text-gray-400 text-sm">
        Selected duration: {effectiveDuration} days
      </div>
    </div>

      </div>

<div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
  <h3 className={`font-medium ${currentTheme.text} mb-2`}>Reward Summary</h3>
  <div className="space-y-2 text-sm">
<div className="flex justify-between">
  <span className="text-gray-400">Daily Reward Rate:</span>
  <span className="text-white">
    {rewardAmount &&
    effectiveDuration &&
    !isNaN(parseFloat(rewardAmount)) &&
    !isNaN(parseInt(effectiveDuration))
      ? (parseFloat(rewardAmount) / parseInt(effectiveDuration)).toFixed(2)
      : '0.00'}{' '}
    {rewardTokenSymbol || 'tokens'}/day
  </span>
</div>

    <div className="flex justify-between">
      <span className="text-gray-400">Total Duration:</span>
      <span className="text-white">{duration && duration !== '-' ? duration : customDuration || 0} days</span>
    </div>
  </div>
</div>


      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep(2)}
          className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(4)}
          disabled={!rewardToken || !rewardAmount || !startDate}
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
            rewardToken && rewardAmount && startDate
              ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
    ) : (
      <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Add Reward</h2>
        <p className="text-gray-400">Configure reward token and farming period</p>
      </div>

      <div className="grid grid-span gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Reward Token</label>
            <div className="relative">
              <input
                ref={rewardTokenRef}
                type="text"
                placeholder="Token address or symbol"
                value={rewardToken}
                onChange={(e) => setRewardToken(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
              />
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Total Reward Amount (Ether)</label>
            <input
              ref={rewardAmountRef}
              type="number"
              placeholder="0.00"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Program Duration (Days)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
            >
              <option value="7">7 Days</option>
              <option value="14">14 Days</option>
              <option value="30">30 Days</option>
              <option value="90">90 Days</option>
              <option value="365">365 Days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
        <h3 className={`font-medium ${currentTheme.text} mb-2`}>Reward Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Daily Reward Rate:</span>
            <span className="text-white">{rewardAmount && duration ? (parseFloat(rewardAmount) / parseInt(duration)).toFixed(2) : '0.00'} {rewardTokenSymbol ? rewardTokenSymbol : 'tokens'}/day</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Duration:</span>
            <span className="text-white">{duration} days</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep(2)}
          className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(4)}
          disabled={!rewardToken || !rewardAmount || !startDate}
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
            rewardToken && rewardAmount && startDate
              ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
    )
    
  );

  const ReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Review Farm Details</h2>
        <p className="text-gray-400">Confirm your farming program configuration</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <h3 className="font-medium text-white mb-3">Program Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Staking Type:</span>
              <span className="text-white ml-2">{stakingType}</span>
            </div>
            <div>
              <span className="text-gray-400">Chain:</span>
              <span className="text-white ml-2">{currentTheme.name}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <h3 className="font-medium text-white mb-3">Pool Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Pool:</span>
              <span className="text-white ml-2">{selectedPool?.name}</span>
            </div>
            <div>
              <span className="text-gray-400">Current APR:</span>
              <span className={`ml-2 ${currentTheme.text}`}>{selectedPool?.apr}</span>
            </div>
            <div>
              <span className="text-gray-400">TVL:</span>
              <span className="text-white ml-2">{selectedPool?.tvl}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <h3 className="font-medium text-white mb-3">Reward Configuration</h3>
          <div className="grid grid-span-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Reward Token:</span>
              <span className="text-white ml-2">{rewardToken}</span>
            </div>
            <div> 
              <span className="text-gray-400">Total Amount:</span>
              <span className="text-white ml-2">{rewardAmount}</span>
            </div>
            <div>
              <span className="text-gray-400">Duration:</span>
              <span className="text-white ml-2">{duration} days</span>
            </div>
            <div>
              <span className="text-gray-400">Start Date:</span>
              <span className="text-white ml-2">{startDate}</span>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
          <h3 className={`font-medium ${currentTheme.text} mb-3`}>Estimated Metrics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Daily Reward Rate:</span>
              <span className="text-white ml-2">{(parseFloat(rewardAmount) / parseInt(duration)).toFixed(2)} {rewardTokenSymbol ? rewardTokenSymbol : 'tokens'}/day</span>
            </div>
            <div>
              <span className="text-gray-400">Estimated APR Boost:</span>
              <span className={`ml-2 ${currentTheme.text}`}>+{((parseFloat(rewardAmount) / parseInt(duration)) * 365 / 100000 * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep(3)}
          className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`}
        >
          Create Farm
        </button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectStakingTypeStep />;
      case 2:
        return <SelectPoolStep />;
      case 3:
        return <AddRewardStep />;
      case 4:
        return <ReviewStep />;
      default:
        return <SelectStakingTypeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto w-full mt-[120px]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Earn Program</h1>
            <p className="text-gray-400">Set up farming rewards for liquidity providers</p>
          </div>

          <ChainSelector />
          <StepIndicator />
          
          <div className="bg-gray-800 border border-gray-600 rounded-xl p-6">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEarnProgram;