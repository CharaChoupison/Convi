import Link from "next/link";
import Logo from "../../components/global/Logo";
import { MoonIcon, Sun } from "lucide-react";
// import { useState } from "react";

export default function Nav() {
  // const [Theme, SetTheme] = useState<"light" | "dark">("light");

  return (
    <nav className="bg-clr-muted text-clr sticky top-0 z-50 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          <Logo className="h-8 w-8 fill-[var(--clr-text)]" />
          <span className="ml-2 text-lg font-semibold">Convi lib</span>
        </Link>
        <div className="flex space-x-4">
          <Link href="/docs" className="text-sm">
            Docs
          </Link>
          <Link href="/components" className="text-sm">
            Components
          </Link>
          <Link href="/theme" className="text-sm">
            Theme
          </Link>
        </div>
      </div>
    </nav>
  );
}
