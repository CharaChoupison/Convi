"use client";

import { useEffect, useMemo, useState } from "react";

type Brand = "default" | "emerald" | "violet" | "amber" | "rose" | "cyan";

const BRANDS: { id: Brand; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "emerald", label: "Emerald" },
  { id: "violet", label: "Violet" },
  { id: "amber", label: "Amber" },
  { id: "rose", label: "Rose" },
  { id: "cyan", label: "Cyan" },
];

export default function ThemeLab() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light"; // Valeur par défaut pour SSR
  });
  const [brand, setBrand] = useState<Brand>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("brand") as Brand;
      if (BRANDS.some((b) => b.id === saved)) return saved;
    }
    return "default";
  });

  // Écoute les changements de préférence système (seulement si pas de sauvegarde)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Applique les sélections sur <html> et sauvegarde
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.setAttribute("data-theme", brand);
    localStorage.setItem("theme", theme);
    localStorage.setItem("brand", brand);
  }, [theme, brand]);

  // Pour afficher un petit swatch de chaque brand dans la grille de preview
  const previewBoxes = useMemo(
    () =>
      BRANDS.map((b) => (
        <div
          key={b.id}
          data-theme={b.id}
          className="card grid place-items-center gap-2 p-4"
        >
          <div className="bg-primary size-16 rounded-xl shadow" />
          <p className="text-fg/70 text-sm">{b.label}</p>
        </div>
      )),
    [],
  );

  return (
    <div className="bg-clr text-fg min-h-dvh transition-colors duration-300">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-10">
        <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">🎨 Theme Lab — Tailwind v4</h1>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }
              className="bg-clr-muted rounded-xl px-4 py-2 font-medium text-white shadow transition hover:opacity-90"
              aria-label="Basculer clair/sombre"
              suppressHydrationWarning
            >
              {theme === "light" ? "🌙 Sombre" : "☀️ Clair"}
            </button>

            <div className="flex items-center gap-2">
              <label htmlFor="brand" className="text-fg/70 text-sm">
                Thème couleur
              </label>
              <select
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value as Brand)}
                className="bg-bg rounded-lg border px-3 py-2 text-sm"
              >
                {BRANDS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          <DemoCard title="Boutons">
            <div className="flex flex-wrap gap-3">
              <button className="bg-primary rounded-xl px-4 py-2 font-medium text-white shadow transition hover:opacity-90">
                Primaire
              </button>
              <button className="border-fg hover:bg-muted rounded-xl border px-4 py-2 font-medium transition">
                Outline
              </button>
              <button className="hover:bg-muted rounded-xl px-4 py-2 font-medium transition">
                Ghost
              </button>
            </div>
          </DemoCard>

          <DemoCard title="Formulaire">
            <form className="space-y-3">
              <input
                placeholder="Votre email"
                className="bg-bg placeholder:text-fg/50 w-full rounded-xl border px-3 py-2"
              />
              <button className="bg-primary rounded-xl px-4 py-2 font-medium text-white shadow transition hover:opacity-90">
                S’inscrire
              </button>
            </form>
          </DemoCard>

          <DemoCard title="Couleurs actuelles">
            <div className="grid grid-cols-3 gap-4">
              <Swatch name="bg-bg" />
              <Swatch name="bg-muted" />
              <Swatch name="bg-primary" />
            </div>
          </DemoCard>

          <DemoCard title="Aperçu des brands">
            <div className="grid grid-cols-5 gap-3">{previewBoxes}</div>
          </DemoCard>
        </section>
      </div>
    </div>
  );
}

function DemoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Swatch({ name }: { name: "bg-bg" | "bg-muted" | "bg-primary" }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`size-12 rounded-lg ${name}`} />
      <span className="text-fg/70 text-xs">{name}</span>
    </div>
  );
}
