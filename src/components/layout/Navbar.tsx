"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; // Added useState
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Menu,
  Search, // Added Search
  X, // Added X
  LayoutDashboard // Added LayoutDashboard 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Added DropdownMenu imports
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"; // Added Avatar imports
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Hide Navbar on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/shop", label: "المتجر" },
    { href: "/book", label: "حجز صيانة" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <span className="text-2xl">⚡</span>
          </div>
          <span className="text-xl font-bold font-cairo text-primary tracking-tight">المركز الهندسي</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                pathname === link.href ? "text-primary font-bold" : "text-muted-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </Button>

          <div className="h-6 w-px bg-border mx-2" />

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 rounded-full pl-1 pr-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image || ""} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {session.user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{session.user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {((session.user as any)?.role === "admin" || (session.user as any)?.role === "owner") && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4 ml-2" />
                      لوحة التحكم
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => authClient.signOut()}>
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">تسجيل الدخول</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
