"use client"

import { useAtomValue } from "jotai"
import { counterAtom } from "@/atoms/counter"
import { Badge } from "@/components/ui/badge"
import { ArrowDownUp } from "lucide-react"

export default function ComponentB() {
  // Only get the value, we don't need to update it in this component
  const count = useAtomValue(counterAtom)

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <ArrowDownUp className="h-5 w-5 text-gray-500" />
        <p className="text-lg">Listening to shared state</p>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg w-full text-center">
        <p className="text-lg mb-2">Counter Value:</p>
        <Badge variant="outline" className="text-3xl py-3 px-6">
          {count}
        </Badge>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          This component uses <code>useAtomValue</code> to only read from the shared state.
        </p>
      </div>
    </div>
  )
}
