"use client";

import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const path = usePathname();
  console.log("path ", path);

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "History", icon: FileClock, path: "/dashboard/history" },
    { name: "Billing", icon: WalletCards, path: "/dashboard/billing" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <div className="h-screen p-5 shadow-sm border">
      {menu.map((item, idx) => (
        <div
          key={idx}
          className={`${
            path === item.path
              ? "bg-primary text-white "
              : "hover:bg-primary hover:text-white"
          } flex m-2 mr-2 p-2 min-w-10 rounded-lg hover:cursor-pointer`}
        >
          <Link
            href={`${item.path}`}
            className="flex gap-1 justify-center items-center md:justify-start w-full"
          >
            <item.icon />
            <span className="hidden md:inline-block">{item.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideNav;
