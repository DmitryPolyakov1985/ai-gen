"use client";

import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Usage from "./usage";

const SideNav = () => {
  const path = usePathname();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "History", icon: FileClock, path: "/dashboard/history" },
    { name: "Billing", icon: WalletCards, path: "/dashboard/billing" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1 space-y-2">
        {menu.map((item, idx) => (
          <li
            key={idx}
            className={`${
              path === item.path
                ? "border-primary text-primary "
                : "hover:border-primary hover:text-primary"
            } flex m-2 mr-2 p-2 min-w-10 rounded-lg hover:cursor-pointer border`}
          >
            <div className="flex justify-center items-center md:justify-start w-full">
              <Link href={`${item.path}`} className="flex gap-2">
                <item.icon />
                <span className="hidden md:inline-block">{item.name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="pb-20 mt-auto">
        <Usage />
      </div>
    </div>
  );
};

export default SideNav;
