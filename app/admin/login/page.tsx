import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <p className="text-center font-display font-bold text-lg mb-1">
          MEN OUGHT <span className="text-ember">TO PRAY</span>
        </p>
        <h1 className="text-center text-ink-muted text-sm mb-8">Admin Sign In</h1>
        <div className="rounded-3xl border border-line-strong bg-bg-raised/70 p-8">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-ink-faint hover:text-ink-muted">
            &larr; Back to the website
          </Link>
        </p>
      </div>
    </main>
  );
}
