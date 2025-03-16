'use client'
import React from 'react'
import { type WriteContractErrorType } from '@wagmi/core'
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function ErrorModal({ errorMsg, setErrMsg }: {
    errorMsg: WriteContractErrorType | null,
    setErrMsg: React.Dispatch<React.SetStateAction<WriteContractErrorType | null>>
}) {
    const [detailsOpen, setDetailsOpen] = React.useState(false)

    return (
        <Dialog open={errorMsg !== null} onOpenChange={() => setErrMsg(null)}>
            <DialogContent className="sm:max-w-[500px] bg-background border border-border">
                <DialogHeader className="flex flex-row items-center gap-2 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20"><AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" /></div>
                <div>
                    <DialogTitle className="text-xl">Transaction Failed</DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs font-normal bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800">beta 0.0.6</Badge>
                        {errorMsg !== null && <span className="text-xs text-muted-foreground">viem@{Object.values(errorMsg)[5]}</span>}
                    </div>
                </div>
                </DialogHeader>
                <div className="py-2">
                    {errorMsg !== null && <DialogDescription className="text-sm text-foreground mb-2">{Object.values(errorMsg)[1]}</DialogDescription>}
                    <div className="rounded-md bg-muted/50 p-3 text-sm">
                        <div className="font-medium mb-1">Error Type</div>
                        {errorMsg !== null && <div className="font-mono text-xs text-muted-foreground mb-3">{Object.values(errorMsg)[6]}</div>}
                        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen} className="space-y-2">
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="flex w-full justify-between p-0 h-auto">
                                    <span className="text-xs font-medium">Technical Details</span>
                                    {detailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </Button>
                            </CollapsibleTrigger>
                            <Separator />
                            <CollapsibleContent className="space-y-3">
                                {errorMsg !== null &&
                                    <>
                                        <div>
                                            <span className="text-xs font-medium">From</span>
                                            <div className="font-mono text-xs text-muted-foreground truncate">{Object.values(errorMsg)[12]}</div>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium">To</span>
                                            <div className="font-mono text-xs text-muted-foreground truncate">{Object.values(errorMsg)[9]}</div>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium">Function</span>
                                            <div className="font-mono text-xs text-muted-foreground truncate">{Object.values(errorMsg)[11]}</div>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium">Arguments</span>
                                            <div className="font-mono text-xs text-muted-foreground">{Object.values(errorMsg)[8].map((value: string, index: number) => `arg[${index}]: ${value}`).join(", ")}</div>
                                        </div>
                                    </>
                                }                       
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" className="w-full sm:w-auto cursor-pointer" onClick={() => setErrMsg(null)}>Dismiss</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
