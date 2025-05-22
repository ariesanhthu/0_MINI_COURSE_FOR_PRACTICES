import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  modal
}: {
  children: React.ReactNode
  modal?:   React.ReactNode
}) {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <div>{children}</div>
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          {modal}
        </div>
      )}
    </div>
  )
}
