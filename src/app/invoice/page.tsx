"use client";

import Header from "@/components/common/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function InvoiceSuccessPage() {
  const router = useRouter();
  const table = useSelector((state: RootState) => state.order.table);
  const order = useSelector((state: RootState) => state.order.order);

  const total = order.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/table"); // redirect otomatis
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f5eee5] flex flex-col">
      <Header title="Pembayaran Berhasil" />

      <main className="max-w-2xl w-full mx-auto px-4 sm:px-6 py-10 flex flex-col items-center text-center flex-grow">
        <div className="bg-white shadow-md rounded-2xl p-8 w-full">
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            🎉 Pembayaran Sukses!
          </h1>
          <p className="text-gray-700">Terima kasih atas pesanan Anda.</p>
          <p className="text-gray-600 mb-4">
            Nomor Meja: <span className="font-semibold">{table}</span>
          </p>

          <div className="border-t border-gray-200 pt-4 text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Detail Pesanan:
            </h2>
            <ul className="divide-y divide-gray-200 text-sm sm:text-base text-gray-700 mb-4">
              {order.map((item) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-gray-800 border-t pt-3">
              <span>Total:</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Anda akan diarahkan kembali ke halaman utama...
        </p>

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
