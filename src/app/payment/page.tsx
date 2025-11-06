"use client";

import Header from "@/components/common/Header";
import { formatPrice } from "@/utils/format";
import { resetOrder } from "@/features/order/orderSlice";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import { addOrderToHistory } from "@/features/order/orderHistorySlice";

export default function PaymentPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.order.order);
  const table = useSelector((state: RootState) => state.order.table);

  const [paymentStep, setPaymentStep] = useState<"choose" | "e-wallet">(
    "choose"
  );
  const [selectedWallet, setSelectedWallet] = useState<
    "gopay" | "ovo" | "shopeepay" | null
  >(null);

  const total = order.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    if (!selectedWallet) {
      alert("Pilih metode E-Wallet terlebih dahulu.");
      return;
    }

    // Create order object to save to history
    const newOrder = {
      id: `TRX${Date.now()}`, // Unique transaction ID based on timestamp
      date: new Date().toLocaleDateString(),
      total,
      items: order.map((item) => `${item.name} x ${item.quantity}`),
      status: "Selesai", // Set the status to completed
    };

    // Dispatch action to add the order to history
    dispatch(addOrderToHistory(newOrder));

    // Redirect to invoice detail page with ID
    router.push(`/invoice/${newOrder.id}`);

    // Reset order and table after routing
    dispatch(resetOrder());
  };

  return (
    <div className="min-h-screen bg-[#f5eee5] flex flex-col">
      <Header title="Pembayaran" showBack />

      <main className="max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 flex-grow">
        <section className="mb-6">
          <p className="text-gray-700 text-base sm:text-lg">
            Nomor Meja: <span className="font-semibold">{table}</span>
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Ringkasan Pesanan
          </h2>
          <ul className="divide-y divide-gray-200">
            {order.map((item) => (
              <li
                key={item.id}
                className="py-3 flex justify-between text-sm sm:text-base text-gray-700"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between font-bold text-base sm:text-lg text-gray-800">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </section>

        {paymentStep === "choose" && (
          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">
              Pilih Metode Pembayaran:
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/show-qr")}
                className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-sm sm:text-base"
              >
                Bayar di Kasir
              </button>
              <button
                onClick={() => setPaymentStep("e-wallet")}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
              >
                Bayar lewat E-Wallet
              </button>
            </div>
          </section>
        )}

        {paymentStep === "e-wallet" && (
          <section className="mt-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3">
              Pilih E-Wallet:
            </h2>
            <div className="flex flex-col gap-3">
              {["gopay", "ovo", "shopeepay"].map((wallet) => (
                <button
                  key={wallet}
                  onClick={() =>
                    setSelectedWallet(wallet as typeof selectedWallet)
                  }
                  className={`w-full px-4 py-3 rounded-xl text-left capitalize transition ${
                    selectedWallet === wallet
                      ? "border-2 border-green-600 bg-green-50 text-green-700"
                      : "border border-gray-300 text-gray-800"
                  }`}
                >
                  {wallet}
                </button>
              ))}
            </div>

            <button
              onClick={handlePayment}
              disabled={!selectedWallet}
              className={`mt-6 w-full py-3 rounded-xl font-semibold text-white transition ${
                selectedWallet
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Bayar Sekarang
            </button>

            <button
              onClick={() => setPaymentStep("choose")}
              className="mt-4 w-full py-2 text-sm text-gray-600 underline"
            >
              Kembali ke Pilihan Metode
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
