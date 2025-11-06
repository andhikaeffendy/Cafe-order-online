"use client";

import Header from "@/components/common/Header";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { formatPrice } from "@/utils/format";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const order = useAppSelector((state) =>
    state.orderHistory.history.find((o) => o.id === id)
  );

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f5eee5] p-6">
        <Header title="Invoice" showBack />
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow">
          <p className="text-red-600 font-medium">Invoice tidak ditemukan.</p>
          <button
            onClick={() => router.push("/table")}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
          >
            Kembali ke Halaman Meja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5eee5] flex flex-col">
      <Header title="Pembayaran Berhasil" />

      <main className="max-w-2xl w-full mx-auto px-4 sm:px-6 py-10 flex flex-col items-center text-center flex-grow">
        <div className="bg-white shadow-md rounded-2xl p-8 w-full">
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            🎉 Pembayaran Sukses!
          </h1>
          <p className="text-gray-700">Terima kasih atas pesanan Anda.</p>
          <p className="text-gray-600 mb-4">No. Transaksi: {order.id}</p>

          <div className="border-t border-gray-200 pt-4 text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Detail Pesanan:
            </h2>
            <ul className="divide-y divide-gray-200 text-sm sm:text-base text-gray-700 mb-4">
              {order.items.map((item, idx) => (
                <li key={idx} className="py-2">{item}</li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-gray-800 border-t pt-3">
              <span>Total:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push("/table")}
          className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition"
        >
          Kembali ke Halaman Meja
        </button>
      </main>
    </div>
  );
}