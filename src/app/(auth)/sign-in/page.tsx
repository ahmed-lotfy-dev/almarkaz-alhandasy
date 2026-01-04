"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await authClient.signIn.email({
      email,
      password,
    }, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        window.location.href = "/";
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        setLoading(false);
      },
    });
  };

  const handleSignUp = async () => {
    setLoading(true);
    await authClient.signUp.email({
      email,
      password,
      name: "New User", // Default name for now
    }, {
      onSuccess: () => {
        window.location.href = "/";
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center font-bold font-cairo">تسجيل الدخول</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-right"
          />
          <Input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-right"
          />
          <div className="flex gap-2">
            <Button className="w-full" onClick={handleSignIn} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              دخول
            </Button>
            <Button className="w-full" variant="outline" onClick={handleSignUp} disabled={loading}>
              إنشاء حساب
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
