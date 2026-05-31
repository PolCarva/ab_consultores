"use client";

import { signOut } from "next-auth/react";

export default function AdminSignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="rounded-full border border-moss/20 px-4 py-1.5 text-sm font-medium text-moss link-hover"
    >
      Salir
    </button>
  );
}
