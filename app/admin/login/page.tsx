"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin/noticias";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email o contraseña incorrectos");
      return;
    }

    window.location.href = result?.url ?? callbackUrl;
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <img src="/logo-small.svg" alt="A&B" className="mx-auto mb-6 h-14" />
        <h1 className="font-sans-custom text-2xl font-bold text-moss">Acceso administrador</h1>
        <p className="mt-2 text-charcoal/60">Gestioná las noticias del sitio</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-moss/10 bg-white p-8 shadow-sm"
      >
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-800">{error}</p>
        )}

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-moss">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-moss/20 px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold text-moss">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-moss/20 px-4 py-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-magnetic w-full rounded-full bg-green-accent py-3 font-semibold text-cream disabled:opacity-50"
        >
          {loading ? "Ingresando…" : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
