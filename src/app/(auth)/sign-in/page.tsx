"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { SignUpForm } from "@/features/auth/components/SignUpForm";

export default function AuthPage() {
  const [view, setView] = useState<"signin" | "signup">("signin");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        {view === "signin" ? (
          <SignInForm onSwitch={() => setView("signup")} />
        ) : (
          <SignUpForm onSwitch={() => setView("signin")} />
        )}
      </Card>
    </div>
  );
}
