// app/dashboard/page.tsx
import Link from "next/link";
export default function DashboardPage() {
  return (
    <>
      <p>Welcome to Dashboard.</p>
      <Link href="/dashboard/modal">Open modal (same-level)</Link>
    </>
  )
}
