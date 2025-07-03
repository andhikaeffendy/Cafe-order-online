"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import Header from "@/components/common/Header";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const orderHistory = useAppSelector((state) => state.orderHistory.history);
  const order = orderHistory.find((order) => order.id === id);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "selesai":
      case "success":
        return "text-green-600";
      case "sedang dibuat":
      case "pending":
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
      case "sedang dibuat":
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "batal":
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f9fafb] p-4">
        <p className="text-red-500 font-medium">Pesanan tidak ditemukan.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header title="Detail Pesanan" showBack />
      <div className="p-4">
        <div className="bg-white shadow rounded-2xl p-6 border space-y-4">
          <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Pesanan #{order.id}
              </h3>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
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

          <div className="text-sm text-gray-700 space-y-2">
            <div>
              <p className="font-medium text-gray-900 mb-1">Item:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <p>
              <span className="font-medium text-gray-900">Total:</span> Rp
              {order.total}
            </p>
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
