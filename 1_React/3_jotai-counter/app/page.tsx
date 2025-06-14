"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import ComponentA from "@/components/component-a"
import ComponentB from "@/components/component-b"
import { counterAtom } from "@/atoms/counter"
import { useAtom } from "jotai"

export default function Home() {
  // This is just to ensure the atom is initialized
  const [counter] = useAtom(counterAtom);
  return (
    <main className="min-h-screen flex flex-row items-center justify-center p-4 bg-gray-50 w-full">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center mb-2">Jotai State Management Demo</h1>
        <p className="text-gray-600 text-center mb-8">
          This demo shows how state is shared between components using Jotai
        </p>

        <div className="grid md:grid-cols-3 gap-6 w-full">
          <Card className="shadow-md">
            <CardHeader className="bg-gray-100">
              <CardTitle>Component A</CardTitle>
              <CardDescription>This component contains a button that increments the counter</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ComponentA />
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="bg-gray-100">
              <CardTitle>Component B</CardTitle>
              <CardDescription>This component displays the counter value from the shared state</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ComponentB />
            </CardContent>
          </Card>
       <Card className="shadow-md bg-gray-950 text-white">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
  <ol className="list-decimal pl-5 space-y-2">
    {counter%5 >= 1 && (
      <li>
        We create a shared atom in <code>atoms/counter.ts</code>
      </li>
    )}
    
    {counter%5 >= 2 && (
      <li>
        <span className="font-bold">ComponentA</span> imports the atom and uses <code>useAtom</code> to get and update the state
      </li>
    )}
    
    {counter%5 >= 3 && (
      <li>
        <span className="font-bold">ComponentB</span> also imports the same atom and uses <code>useAtomValue</code> to read the state
      </li>
    )}
    
    {counter%5 >= 4 && (
      <li>
        When the button in <span className="font-bold">ComponentA</span> is clicked, both components reflect the updated state
      </li>
    )}
  </ol>
</CardContent>
        </Card>
       </div>
      </div>
    </main>
  )
}
