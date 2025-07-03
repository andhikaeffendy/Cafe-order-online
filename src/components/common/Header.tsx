"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Menu } from "lucide-react";
import { cn } from "@/utils/cn";
import { useState } from "react";
import Link from "next/link";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  className?: string;
};

export default function Header({
  title = "QR Cafe",
  showBack = false,
  className,
}: HeaderProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "bg-[#f5eee5] sticky top-0 z-50 px-5 py-4 flex items-center justify-between border-b border-gray-200",
        className
      )}
    >
      {/* Left: Back Button + Title */}
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-300/50 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/order" className="hover:underline">
          Riwayat Pesanan
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-gray-300/50 transition"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border border-gray-200 z-50">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <Link
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Riwayat Pesanan
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
