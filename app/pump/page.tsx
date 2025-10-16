'use client';
import { useEffect, useState } from 'react';
import { useAccount } from "wagmi";
import { useRouter } from 'next/navigation';

export default function Home() {
    const { chainId } = useAccount();
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        if (chainId === undefined) return;
        if (chainId === 25925 || chainId === null) router.push('/pump/launchpad?chain=kubtestnet&mode=pro');
        else if (chainId === 96 || chainId === 10143) setShowPopup(true);
    }, [chainId]);
    const handleConfirm = () => {
        if (chainId === 96) window.location.href = 'https://www.cmswap.fun/pump/launchpad?chain=kub&mode=pro';
        else if (chainId === 10143) window.location.href = 'https://www.cmswap.fun/pump/launchpad?chain=monad&mode=pro';
    };
    const handleCancel = () => {router.push('/pump/launchpad?chain=kubtestnet&mode=pro')};
    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#0c1917] border border-green-400/30 rounded-2xl p-6 text-center shadow-2xl w-[90%] max-w-md">
                        <h2 className="text-xl font-semibold text-green-300 mb-2">Notice: Pump v1 Detected</h2>
                        <p className="text-gray-300 text-sm leading-relaxed">You are connected to {chainId === 96 ? ' KUB Chain (Mainnet)' : ' Monad Testnet'}.<br />
                            <span className="text-green-400 font-medium">Pump v1</span> for this chain uses a new URL.
                            <br />
                            Would you like to switch to <span className="text-green-400">Pump v1</span>?
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button onClick={handleCancel} className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600 transition">No, stay on Pump v2 (KUB Testnet)</button>
                            <button onClick={handleConfirm} className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition">Yes, go to Pump v1</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
