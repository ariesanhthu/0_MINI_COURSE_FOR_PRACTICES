"use client"

import { useAtom } from "jotai"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { counterAtom } from "@/atoms/counter"

export default function ComponentA() {
  // Get both the value and the setter function
  const [count, setCount] = useAtom(counterAtom)

  const incrementCounter = () => {
    setCount(count + 1)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        <p className="text-lg font-medium">
          Current Count: <span className="text-2xl font-bold">{count}</span>
        </p>
      </div>

      <Button onClick={incrementCounter} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Increment Counter
      </Button>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          This component uses <code>useAtom</code> to both read and write to the shared state.
        </p>
      </div>
    </div>
  )
}
