"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  // Hide Navbar on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const links = [
    { href: "/", label: "الرئيسية" },
    { href: "/shop", label: "المتجر" },
    { href: "/book", label: "حجز صيانة" },
    // { href: "/contact", label: "اتصل بنا" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl font-cairo text-primary">
          <span className="text-2xl">⚡</span>
          المركز الهندسي
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary font-bold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* User Auth */}
          {session ? (
            <Button variant="ghost" size="icon" asChild title={session.user.name}>
              <Link href="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" asChild className="hidden md:flex">
              <Link href="/sign-in">دخول</Link>
            </Button>
          )}

          {/* Cart (Placeholder) */}
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {/* <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">0</span> */}
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary font-bold" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {!session && (
                  <Button asChild className="mt-4">
                    <Link href="/sign-in">تسجيل الدخول</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
