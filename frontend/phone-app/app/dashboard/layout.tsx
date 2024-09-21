import { Home, Phone, User,Search,Pickaxe } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0e3b2e] text-[#e8e1d5] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">{children}</main>
      <nav className="bg-[#0e3b2e] border-t border-[#e8e1d5]/20">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between">
            <Link href="/dashboard" className="flex flex-col items-center py-2">
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">home</span>
            </Link>
            <Link href="/dashboard/service" className="flex flex-col items-center py-2">
              <Pickaxe className="h-6 w-6" />
              <span className="text-xs mt-1">Service</span>
            </Link>
            <Link href="/dashboard/search" className="flex flex-col items-center py-2">
              <Search className="h-6 w-6" />
              <span className="text-xs mt-1">Search</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
