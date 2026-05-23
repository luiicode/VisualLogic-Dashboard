"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoName } from "@/components/ui/svg/LogoName";
import { LogIn } from "lucide-react";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full gap-8 p-4 sm:p-8">
      <section className="flex flex-col items-center gap-2 text-center">
        <LogoName />
        <h1 className="text-2xl md:text-3xl font-bold mt-4 text-white">
          Welcome Back
        </h1>
        <p className="text-gray-300 text-sm md:text-base font-normal">
          Sign in to continue to your workspace
        </p>
      </section>
      <section className="flex items-center w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
          <section className="flex flex-col gap-1.5 items-start text-white w-full">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-black bg-white/90 border-none placeholder:text-slate-500"
            />
          </section>
          <section className="flex flex-col gap-1.5 items-start text-white w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black bg-white/90 border-none placeholder:text-slate-500"
            />
          </section>
          <Button className="w-full bg-white text-black hover:bg-slate-200 font-semibold mt-2">
            Sign In
            <LogIn className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </section>
    </main>
  );
}
