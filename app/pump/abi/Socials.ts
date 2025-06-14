export const SocialsABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_bkgaProFactoryAddr",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_bkgaLiteFactoryAddr",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "bkgaLiteFactoryAddr",
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
        "name": "bkgaProFactoryAddr",
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
                "internalType": "address",
                "name": "lpAddr",
                "type": "address"
            }
        ],
        "name": "freezeLp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_lpAddr",
                "type": "address"
            }
        ],
        "name": "getCreator",
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
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isCreatorSuspended",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isLpFrozen",
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
                "internalType": "address",
                "name": "_lpAddr",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "fb",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "x",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "telegram",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "website",
                "type": "string"
            }
        ],
        "name": "setSocialMedia",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_lpAddr",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "fb",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "x",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "telegram",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "website",
                "type": "string"
            }
        ],
        "name": "setSocialMediaByAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "socials",
        "outputs": [
            {
                "internalType": "string",
                "name": "fbURL",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "xURL",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "telegramURL",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "websiteURL",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "creatorAddr",
                "type": "address"
            }
        ],
        "name": "suspendCreator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "lpAddr",
                "type": "address"
            }
        ],
        "name": "unfreezeLp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "creatorAddr",
                "type": "address"
            }
        ],
        "name": "unsuspendCreator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]