import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"

export function RootLayout() {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="container mx-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
} 