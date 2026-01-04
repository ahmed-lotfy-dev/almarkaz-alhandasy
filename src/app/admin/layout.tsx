"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      // router.push("/sign-in"); // Temporary: For now we let everyone in or handle this better later with Roles
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  // Ideally check for role === 'admin' here

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
