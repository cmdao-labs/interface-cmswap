'use client';
import { useSearchParams } from "next/navigation";
import React from "react";

export const experimental_ppr = true;
export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const chain = searchParams.get('chain') || '';
    return (
        <div className={"items-start justify-items-center min-h-screen gap-16 p-4 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-slate-700 via-black " + (chain === "monad" ? "to-purple-300" : "") + (chain === "kub" ? "to-[#01ff99]" : "")}>
            {children}
        </div>
    );
}
