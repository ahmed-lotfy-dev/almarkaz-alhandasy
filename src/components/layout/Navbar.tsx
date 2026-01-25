"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  ShoppingCart,
  Menu,
  Search,
  X,
  LayoutDashboard
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar effects
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/shop", label: "المتجر" },
    { href: "/book", label: "حجز صيانة" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center py-4 px-4",
        isScrolled ? "translate-y-0" : "translate-y-2"
      )}
    >
      <div
        className={cn(
          "container mx-auto px-6 h-16 flex items-center justify-between rounded-full border transition-all duration-500",
          isScrolled
            ? "glass-card shadow-xl max-w-6xl border-white/20"
            : "bg-background/80 backdrop-blur-md border-border/50 max-w-7xl"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 bg-gradient-to-tr from-accent to-primary rounded-xl flex items-center justify-center p-2 shadow-lg group-hover:rotate-6 transition-transform">
            <div className="w-5 h-5 border-2 border-white rounded-md rotate-45" />
            <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-heading text-primary leading-none">المركز الهندسي</span>
            <span className="text-[10px] text-accent font-medium tracking-tight uppercase">Al Markaz Al Handasy</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-accent relative py-1",
                pathname === link.href ? "text-accent" : "text-muted-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full animate-in fade-in zoom-in duration-300" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          <div className="h-4 w-px bg-border/50 mx-2" />

          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent transition-colors">
            <Search className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-accent/10 hover:text-accent transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-accent text-[10px] items-center justify-center text-white">2</span>
            </span>
          </Button>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-3 rounded-full pl-1 pr-4 bg-primary/5 hover:bg-primary/10 transition-colors">
                  <Avatar className="h-8 w-8 ring-2 ring-accent/20">
                    <AvatarImage src={session.user.image || ""} />
                    <AvatarFallback className="bg-primary text-white text-xs">
                      {session.user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-bold font-heading">{session.user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 glass-card p-2">
                <DropdownMenuLabel className="font-heading px-3 py-2">حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {((session.user as any)?.role === "admin" || (session.user as any)?.role === "owner") && (
                  <DropdownMenuItem asChild className="rounded-lg mb-1 focus:bg-accent/10 focus:text-accent">
                    <Link href="/admin" className="cursor-pointer">
                      <LayoutDashboard className="h-4 w-4 ml-3" />
                      لوحة التحكم
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => authClient.signOut()}
                  className="rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="accent" className="rounded-full px-6 shadow-lg shadow-accent/20 hover:shadow-accent/40 active:scale-95 transition-all">
              <Link href="/sign-in">دخول</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="absolute top-20 left-4 right-4 glass-card p-6 md:hidden flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 rounded-3xl z-50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xl font-bold font-heading px-4 py-3 rounded-2xl transition-all",
                    pathname === link.href ? "bg-accent/10 text-accent" : "hover:bg-primary/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="h-px bg-border/50" />
            <div className="flex items-center justify-between px-4">
              <span className="font-medium">المظهر الداكن</span>
              <ThemeToggle />
            </div>
            {!session && (
              <Button asChild className="w-full rounded-2xl h-14 text-lg">
                <Link href="/sign-in">تسجيل الدخول</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
