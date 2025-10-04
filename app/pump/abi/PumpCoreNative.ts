export const PumpCoreNativeABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_wrappedNative",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_v3factory",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_v3posManager",
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
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "tokenAddr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "logo",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "link1",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "link2",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "link3",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "createdTime",
                "type": "uint256"
            }
        ],
        "name": "Creation",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "tokenAddr",
                "type": "address"
            }
        ],
        "name": "Graduation",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bool",
                "name": "isBuy",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "reserveIn",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "reserveOut",
                "type": "uint256"
            }
        ],
        "name": "Swap",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "INITIALTOKEN",
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
                "name": "_tokenAddr",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_minToken",
                "type": "uint256"
            }
        ],
        "name": "buy",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "createFee",
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
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_logo",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_link1",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_link2",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_link3",
                "type": "string"
            }
        ],
        "name": "createToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeCollector",
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
                "name": "_inputAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_inputReserve",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_outputReserve",
                "type": "uint256"
            }
        ],
        "name": "getAmountOut",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_tokenAddr",
                "type": "address"
            }
        ],
        "name": "graduate",
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
        "inputs": [],
        "name": "graduationAmount",
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
        "name": "initialNative",
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
        "name": "isGraduate",
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
        "name": "pumpFee",
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
        "name": "pumpReserve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "native",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "token",
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
                "name": "_tokenAddr",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenSold",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_minToken",
                "type": "uint256"
            }
        ],
        "name": "sell",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_initialNative",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_virtualAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_graduationAmount",
                "type": "uint256"
            }
        ],
        "name": "setCurveState",
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
                "internalType": "uint256",
                "name": "_createFee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_pumpFee",
                "type": "uint256"
            }
        ],
        "name": "setFee",
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
                "name": "_newFeeCollector",
                "type": "address"
            }
        ],
        "name": "setFeeCollector",
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
        "inputs": [],
        "name": "v3factory",
        "outputs": [
            {
                "internalType": "contract IUniswapV3Factory",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "v3posManager",
        "outputs": [
            {
                "internalType": "contract INonfungiblePositionManager",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "virtualAmount",
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
        "name": "wrappedNative",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const;