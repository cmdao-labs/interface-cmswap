export const FieldsV2RouterAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            }
        ],
        "name": "AllowStakedUseByPeriphery",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            }
        ],
        "name": "EmergencyWithdrawNft",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "peripheryOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "rewardTokenIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "migrateAmount",
                "type": "uint256"
            }
        ],
        "name": "EmergencyWithdrawRewardToken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "migrateTo",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "rewardTokenIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "migrateAmount",
                "type": "uint256"
            }
        ],
        "name": "MigratePeripheryRewardToAddr",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndexFrom",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndexTo",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "rewardTokenIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "migrateAmount",
                "type": "uint256"
            }
        ],
        "name": "MigratePeripheryRewardToHook",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            }
        ],
        "name": "NftStaked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            }
        ],
        "name": "NftUnstaked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            }
        ],
        "name": "RevokeStakedUseByPeriphery",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "claimedTo",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "rewardTokenIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "claimedAmount",
                "type": "uint256"
            }
        ],
        "name": "SendRewardFromPeriphery",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "SetPeripheryOwner",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "peripheryOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "rewardTokenIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardTokenAmount",
                "type": "uint256"
            }
        ],
        "name": "SetPeripheryReward",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "robber",
                "type": "address"
            }
        ],
        "name": "StealNftStakedFromPeriphery",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            }
        ],
        "name": "SyncNftStakedAtFromPeriphery",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            }
        ],
        "name": "allowStakedUseByPeriphery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            }
        ],
        "name": "emergencyWithdrawNft",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rewardTokenIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_migrateAmount",
                "type": "uint256"
            }
        ],
        "name": "emergencyWithdrawRewardToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeForCreatePeriphery",
        "outputs": [
            {
                "internalType": "address",
                "name": "feeCollector",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "hookUseByPeriphery",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "hooks",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "hooksCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hooksIndexOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndex",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_migrateTo",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_rewardTokenIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_migrateAmount",
                "type": "uint256"
            }
        ],
        "name": "migratePeripheryRewardToAddr",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndexFrom",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_peripheryIndexTo",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rewardTokenIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_migrateAmount",
                "type": "uint256"
            }
        ],
        "name": "migratePeripheryRewardToHook",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            }
        ],
        "name": "nftStake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            }
        ],
        "name": "nftUnstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "nfts",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nftsCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "nftsIndexOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "periphery",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "peripheryCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "peripheryIndexOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "peripheryOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            }
        ],
        "name": "revokeStakedUseByPeriphery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "rewardTokenIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            }
        ],
        "name": "rewardTokenUseByPeriphery",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "rewardTokenAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "rewardTokens",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardTokensCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "rewardTokensIndexOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndex",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_claimedTo",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_rewardTokenIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_claimedAmount",
                "type": "uint256"
            }
        ],
        "name": "sendRewardFromPeriphery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_feeCollector",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_feeAmount",
                "type": "uint256"
            }
        ],
        "name": "setFeeForCreatePeriphery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_hookAddr",
                "type": "address"
            }
        ],
        "name": "setHook",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddr",
                "type": "address"
            }
        ],
        "name": "setNft",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_peripheryAddr",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_peripheryOwner",
                "type": "address"
            }
        ],
        "name": "setPeriphery",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndex",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "setPeripheryOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rewardTokenIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rewardTokenAmount",
                "type": "uint256"
            }
        ],
        "name": "setPeripheryReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_rewardTokenAddr",
                "type": "address"
            }
        ],
        "name": "setRewardToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            }
        ],
        "name": "stakedData",
        "outputs": [
            {
                "internalType": "address",
                "name": "nftOwnerOf",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "nftStakedAt",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "peripheryIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            }
        ],
        "name": "stakedUseByPeriphery",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_robber",
                "type": "address"
            }
        ],
        "name": "stealNftStakedFromPeriphery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            }
        ],
        "name": "syncNftStakedAtFromPeriphery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const

export const FieldsHook001 = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_peripheryIndexOnRouter",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_baseHashRate",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_cmdaoFieldsV2Router",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "rewardTokenIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "claimedTo",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "claimedAmount",
                "type": "uint256"
            }
        ],
        "name": "ClaimReward",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "oldBonusMultiplier",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "newBonusMultiplier",
                "type": "uint256"
            }
        ],
        "name": "SetBonusMultiplier",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIdMin",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIdMax",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "hashRate",
                "type": "uint256"
            }
        ],
        "name": "SetHashRateForNftIdRange",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "hashRate",
                "type": "uint256"
            }
        ],
        "name": "SetHashRateForNftIndex",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "rewardTokenIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "emissionRate",
                "type": "uint256"
            }
        ],
        "name": "SetRewardEmission",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "baseHashRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bonusMultiplier",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            }
        ],
        "name": "calculatePoint",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rewardTokenIndex",
                "type": "uint256"
            }
        ],
        "name": "calculateReward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rewardTokenIndex",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_claimedTo",
                "type": "address"
            }
        ],
        "name": "claimReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "cmdaoFieldsV2Router",
        "outputs": [
            {
                "internalType": "contract ICmdaoFieldsV2Router",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            }
        ],
        "name": "hashRateForNftId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "hashRateForNftIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "peripheryIndexOnRouter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "rewardEmissionRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_newBonusMultiplier",
                "type": "uint256"
            }
        ],
        "name": "setBonusMultiplier",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftIdMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftIdMax",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_hashRate",
                "type": "uint256"
            }
        ],
        "name": "setHashRateForNftIdRange",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_hashRate",
                "type": "uint256"
            }
        ],
        "name": "setHashRateForNftIndex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_rewardTokenIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_emissionRate",
                "type": "uint256"
            }
        ],
        "name": "setRewardEmission",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const

export const TestDaAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "miner",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "blockNumber",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "difficulty",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "hashBlock",
                "type": "string"
            }
        ],
        "name": "Blockchain",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "currentBlock",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentDifficulty",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endBlocktime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_currentBlock",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_currentDifficulty",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_miner",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_hashBlock",
                "type": "string"
            }
        ],
        "name": "setNewBlock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "startBlocktime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const

export const FieldsHook002 = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_rewardName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_rewardSymbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_peripheryIndexOnRouter",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_cmdaoFieldsV2Router",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "minerOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "solvedBlockNumber",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "solvedBaseDifficulty",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "solvedMinerDifficulty",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "solvedHash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "elapsedTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "blockReward",
                "type": "uint256"
            }
        ],
        "name": "BlockMined",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "nftIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isEligible",
                "type": "bool"
            }
        ],
        "name": "SetNftIndexEligible",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "ADJUSTMENT_INTERVAL",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "cmdaoFieldsV2Router",
        "outputs": [
            {
                "internalType": "contract ICmdaoFieldsV2Router",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentBlock",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentDifficulty",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBlockReward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "isNftIndexEligible",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lastBlockTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "peripheryIndexOnRouter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_isEligible",
                "type": "bool"
            }
        ],
        "name": "setNftIndexEligible",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "sha256Hash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nftIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_nonce",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_hash",
                "type": "bytes32"
            }
        ],
        "name": "submitPoW",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
