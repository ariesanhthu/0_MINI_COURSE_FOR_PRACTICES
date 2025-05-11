// app/dashboard/(.)modal/page.tsx
import Link from "next/link";
export default function DashboardModal() {
  return (
    <div className=" p-6 rounded shadow-lg">
      <h2>Modal tại cùng cấp</h2>
      <p>Đây là nội dung modal được inject vào DashboardLayout.</p>
      <Link href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</Link>
    </div>
  )
}
