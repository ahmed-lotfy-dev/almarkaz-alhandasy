"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  CalendarDays,
  Images,
  Settings,
  LogOut,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const sidebarItems = [
  {
    title: "لوحة التحكم",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "المنتجات",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "المواعيد",
    href: "/admin/appointments",
    icon: CalendarDays,
  },
  {
    title: "صور العرض",
    href: "/admin/carousel",
    icon: Images,
  },
  //   {
  //     title: "الإعدادات",
  //     href: "/admin/settings",
  //     icon: Settings,
  //   },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        }
      }
    });
  };

  return (
    <div className="w-64 border-l bg-card h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        <span className="font-bold text-lg font-cairo">لوحة الإدارة</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary",
              pathname === item.href && "bg-primary/10 text-primary font-bold"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        ))}

        <div className="pt-4 mt-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary mb-2"
          >
            <Home className="w-5 h-5" />
            <span>العودة للموقع</span>
          </Link>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-4 py-6 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
