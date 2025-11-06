"use client";

import Header from "@/components/common/Header";
import { formatPrice } from "@/utils/format";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function OrdersPage() {
  const orderHistory = useAppSelector((state) => state.orderHistory.history);
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(`/order/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "selesai":
      case "success":
        return "text-green-600";
      case "pending":
      case "menunggu":
      case "sedang dibuat":
        return "text-yellow-600";
      case "batal":
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "selesai":
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
      case "menunggu":
      case "sedang dibuat":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "batal":
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header title="Riwayat Pesanan" showBack />
      <main className="p-4 bg-gray-50 min-h-screen">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Pesanan Terakhir
        </h2>

        {orderHistory.length === 0 ? (
          <p className="text-gray-500 text-center">
            Belum ada riwayat pesanan.
          </p>
        ) : (
          <div className="grid gap-4">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md border hover:shadow-lg transition-shadow p-5"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    Pesanan #{order.id}
                  </h3>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    <span
                      className={`text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-1">{order.date}</p>

                <div className="mt-4 space-y-1 text-sm text-gray-700">
                  <p>
                    Item:{" "}
                    {Array.isArray(order.items) ? order.items.join(", ") : "-"}
                  </p>

                  <p>
                    Total:{" "}
                    <span className="font-semibold text-gray-900">
                      {formatPrice(order.total)}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => handleViewDetails(order.id)}
                  className="mt-5 inline-block text-blue-600 font-medium hover:underline"
                >
                  Lihat Detail Pesanan →
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
