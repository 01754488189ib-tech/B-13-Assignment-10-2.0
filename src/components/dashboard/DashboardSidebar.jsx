"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  BookOpen,
  Bookmark,
  CircleArrowDownFill,
  Person,
  Gear,
  Briefcase,
  Envelope,
  Persons,
  CreditCard,
} from "@gravity-ui/icons";

export default function DashboardSidebar({ userRole = "user" }) {
  const pathname = usePathname();

  const userLinks = [
    { label: "Dashboard", href: "/dashboard/user", icon: House },
    {
      label: "Purchased Ebooks",
      href: "/dashboard/user/purchased",
      icon: BookOpen,
    },
    {
      label: "Bookmark Shelf",
      href: "/dashboard/user/bookmarks",
      icon: Bookmark,
    },
    { label: "Profile", href: "/dashboard/user/profile", icon: Person },
  ];

  const writerLinks = [
    { label: "Writer Core", href: "/dashboard/writer", icon: House },
    {
      label: "Manage Ebooks",
      href: "/dashboard/writer/ebooks",
      icon: BookOpen,
    },
    {
      label: "Sales History",
      href: "/dashboard/writer/sales",
      icon: CreditCard,
    },
    { label: "Bookmarks", href: "/dashboard/writer/bookmarks", icon: Bookmark },
  ];

  const adminLinks = [
    { label: "Admin Panel", href: "/dashboard/admin", icon: House },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Persons },
    {
      label: "Manage All Ebooks",
      href: "/dashboard/admin/ebooks",
      icon: BookOpen,
    },
    {
      label: "All Transactions",
      href: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
  ];

  const roleLinksMap = {
    user: userLinks,
    writer: writerLinks,
    admin: adminLinks,
  };

  const navItems = roleLinksMap[userRole] || userLinks;

  const isActive = (path) => pathname === path;

  return (
    <aside className="w-full lg:w-64 shrink-0 border-r lg:border-r border-white/5 bg-[#08080c] p-6 flex flex-col justify-between min-h-[50vh] lg:min-h-[calc(100vh-80px)]">
      <div className="space-y-8">
        <div>
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">
            Workspace
          </span>
          <span className="text-xs font-bold text-amber-500 capitalize mt-1 block">
            {userRole} dashboard
          </span>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                  isActive(item.href)
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-zinc-400 hover:bg-white/[0.02] hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/5 pt-6 mt-8">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-500 hover:text-white transition duration-200"
        >
          <Gear className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
