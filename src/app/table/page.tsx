"use client";

import Header from "@/components/common/Header";
import { useRouter } from "next/navigation";

const TABLE_NUMBERS = [1, 2, 3, 4, 5, 6];

export default function TablePage() {
  const router = useRouter();

  const handleTableClick = (tableNumber: number) => {
    router.push(`/menu?table=${tableNumber}`);
  };

  return (
    <div className="min-h-screen bg-[#f5eee5] flex flex-col">
      <Header title="Pilih Meja" />

      <main className="flex-grow px-4 py-8 sm:px-6 md:px-8 max-w-screen-md mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Pilih Meja Anda
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TABLE_NUMBERS.map((number) => (
            <button
              key={number}
              onClick={() => handleTableClick(number)}
              className="bg-white border border-gray-200 hover:border-blue-600 hover:shadow-lg text-gray-800 hover:text-blue-600 rounded-xl p-6 text-lg sm:text-xl font-semibold transition-all duration-200"
            >
              Meja {number}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
