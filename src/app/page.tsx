'use client'

import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";



export default function Home() {
  const handleSignIn = () => {
    signIn('github')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={handleSignIn}>
        <Github/> <span className="ps-4">Sign In with GitHub</span>
      </Button>
    </main>
  );
}
