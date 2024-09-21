import DynamicAuth from "@/app/components/DynamicAuth";
import { Settings, Shield } from "lucide-react";

export default function SideBar() {
  return (
    <aside className="w-64 bg-[#e3e3d0] text-[#0A3622] p-6 ">
      <div className="flex items-center mb-8">
        <span className="text-2xl font-bold">✷ Nori</span>
      </div>
      <nav>
        <p className="text-xs font-semibold mb-4">MENU</p>
        <ul className="space-y-2">
          <li className="bg-[#0D4028] rounded p-2">
            <a href="#" className="flex items-center text-[#e3e3d0]">
              <span className="mr-2">◫</span> Overview
            </a>
          </li>
          <li><a href="#" className="flex items-center"><span className="mr-2">◫</span> Statistics</a></li>
          <li><a href="#" className="flex items-center"><span className="mr-2">◫</span> Customers</a></li>
          <li><a href="#" className="flex items-center"><span className="mr-2">◫</span> Product</a></li>
          <li>
            <a href="#" className="flex items-center">
              <span className="mr-2">◫</span> Messages
              <span className="ml-auto bg-[#CCFF00] text-black text-xs px-1 rounded">13</span>
            </a>
          </li>
          <li><a href="#" className="flex items-center"><span className="mr-2">◫</span> Transactions</a></li>
        </ul>
      </nav>
      <nav className="mt-8">
        <p className="text-xs font-semibold mb-4">GENERAL</p>
        <ul className="space-y-2">
          <li><a href="#" className="flex items-center"><Settings className="mr-2 h-4 w-4" /> Settings</a></li>
          <li><a href="#" className="flex items-center"><Shield className="mr-2 h-4 w-4" /> Security</a></li>
        </ul>
      </nav>
      <div className="mt-auto pt-8">
        <div className="flex items-center">
          <img src="vitalik-buterin.jpg" alt="Profile" className="rounded-full mr-2 w-10" />
          <div>
            <p className="font-semibold">Vitalik Buterin</p>
            <p className="text-xs">vitalik@gmail.com</p>
          </div>
        </div>
        <DynamicAuth />
      </div>
    </aside>
  )
}