"use client";

export default function ThemeLab() {
  return (
    <div className="bg-bg text-fg flex flex-row items-center justify-center gap-8 p-10">
      <h1 className="text-3xl">Theme Lab</h1>
      <button className="transition-scale bg-blue-500 transition-all hover:bg-blue-600 active:scale-95">
        Clique-moi
      </button>
    </div>
  );
}
