"use client";

export default function Footer() {
  return (
    <footer className="bg-[#f5eee5] w-full text-center text-sm text-gray-500 py-5 border-t border-gray-200">
      &copy; {new Date().getFullYear()}{" "}
      <span className="font-medium text-gray-700">QR Cafe</span>. All rights
      reserved.
    </footer>
  );
}
