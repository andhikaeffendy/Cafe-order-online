"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import QRCode from "react-qr-code";
import Header from "@/components/common/Header";

export default function ShowQRPage() {
  const { table, order } = useSelector((state: RootState) => state.order);

  if (!table || order.length === 0) return null;

  const orderData = {
    table: Number(table), // pastikan selalu number
    order: order.map(({ id, name, quantity }) => ({
      id: Number(id), // pastikan id dikirim sebagai angka
      name,
      quantity,
    })),
  };

  const qrValue = JSON.stringify(orderData);

  return (
    <div className="min-h-screen bg-[#f5eee5] flex flex-col">
      <Header showBack />

      <main className="flex-grow px-6 pt-8 pb-10 flex flex-col items-center text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Tunjukkan QR ke Kasir
        </h1>
        <p className="text-gray-600 mb-8">
          Kasir akan memindai QR ini untuk memproses pesananmu.
        </p>

        <div className="bg-white p-4 rounded-xl shadow-lg">
          <QRCode value={qrValue} size={200} />
        </div>

        <p className="mt-6 text-sm text-gray-500 max-w-xs">
          Jangan tutup halaman ini sebelum kasir memproses pesananmu.
        </p>
      </main>
    </div>
  );
}
