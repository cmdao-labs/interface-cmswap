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
    const anyErr: any = errorMsg as any
    const version = anyErr?.version || anyErr?.name || ""
    const short = anyErr?.shortMessage || anyErr?.message || "Transaction failed"
    const reason = anyErr?.details || anyErr?.cause?.shortMessage || anyErr?.message || ""
    const fromVal = anyErr?.from || anyErr?.request?.from || anyErr?.account || ""
    const toVal = anyErr?.to || anyErr?.address || anyErr?.contractAddress || anyErr?.request?.to || anyErr?.meta?.lastCall?.to || ""
    const funcVal = anyErr?.functionName || anyErr?.meta?.functionName || anyErr?.request?.method || anyErr?.meta?.lastCall?.functionName || ""
    const argsVal = anyErr?.args || anyErr?.meta?.args || anyErr?.request?.args || anyErr?.parameters || anyErr?.meta?.lastCall?.args || null
    const incentiveIdVal = anyErr?.meta?.lastCall?.incentiveId || anyErr?.meta?.incentiveId || null
    const viaVal = anyErr?.meta?.lastCall?.via || anyErr?.meta?.via || null

    return (
        <Dialog open={errorMsg !== null} onOpenChange={() => setErrMsg(null)}>
            <DialogContent className="sm:max-w-[500px] bg-background border border-border">
                <DialogHeader className="flex flex-row items-center gap-2 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20"><AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" /></div>
                <div>
                    <DialogTitle className="text-xl">Transaction Failed</DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs font-normal bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800">beta 0.1.1</Badge>
                        {errorMsg !== null && version && <span className="text-xs text-muted-foreground">{String(version)}</span>}
                    </div>
                </div>
                </DialogHeader>
                <div className="py-2">
                    {errorMsg !== null && <DialogDescription className="text-sm text-foreground mb-2">{short}</DialogDescription>}
                    <div className="rounded-md bg-muted/50 p-3 text-sm">
                        <div className="font-medium mb-1">Error Reason</div>
                        {errorMsg !== null && <div className="font-mono text-xs text-muted-foreground mb-3">{reason || 'No reason provided'}</div>}
                        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen} className="space-y-2">
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="flex w-full justify-between p-0 h-auto">
                                    <span className="text-xs font-medium">Technical Details</span>
                                    {detailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </Button>
                            </CollapsibleTrigger>
                            <Separator />
                            <CollapsibleContent className="space-y-3">
  {errorMsg !== null && (
    <>
      {fromVal && (
        <div>
          <span className="text-xs font-medium">From</span>
          <div className="font-mono text-xs text-muted-foreground overflow-x-auto whitespace-nowrap">{String(fromVal)}</div>
        </div>
      )}
      {toVal && (
        <div>
          <span className="text-xs font-medium">To</span>
          <div className="font-mono text-xs text-muted-foreground overflow-x-auto whitespace-nowrap">{String(toVal)}</div>
        </div>
      )}
      {funcVal && (
        <div>
          <span className="text-xs font-medium">Function</span>
          <div className="font-mono text-xs text-muted-foreground overflow-x-auto whitespace-nowrap">{String(funcVal)}</div>
        </div>
      )}
      {argsVal !== null && (
        <div>
          <span className="text-xs font-medium">Arguments</span>
          <div className="font-mono text-xs text-muted-foreground overflow-x-auto text-wrap break-all">
            {Array.isArray(argsVal) ? (
              (argsVal as any[]).map((value: any, index: number) => (
                <div key={index}>arg[{index}]: {String(value)}</div>
              ))
            ) : typeof argsVal === 'object' ? (
              Object.entries(argsVal as Record<string, any>).map(([k, v]) => (
                <div key={k}>{k}: {String(v)}</div>
              ))
            ) : (
              <div>{String(argsVal)}</div>
            )}
          </div>
        </div>
      )}
      {(incentiveIdVal || viaVal) && (
        <div>
          <span className="text-xs font-medium">Incentive Key</span>
          <div className="font-mono text-xs text-muted-foreground overflow-x-auto text-wrap break-all">
            {incentiveIdVal && <div>incentiveId: {String(incentiveIdVal)}</div>}
            {viaVal && <div>via: {String(viaVal)}</div>}
          </div>
        </div>
      )}
    </>
  )}
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
