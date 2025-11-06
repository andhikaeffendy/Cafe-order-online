"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "@/store";
import { setTable, addItem, removeItem } from "@/features/order/orderSlice";
import Header from "@/components/common/Header";
import { menuItems } from "@/data/MenuItems";
import MenuCardItem from "@/components/menu/MenuItemsCard";

export default function MenuPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tableParam = searchParams.get("table");
  const order = useSelector((state: RootState) => state.order.order);
  const table = useSelector((state: RootState) => state.order.table);

  type Category = "Coffee" | "Non-Coffee" | "Dessert" | "Makanan" | "All";

  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (tableParam) {
      dispatch(setTable(Number(tableParam)));
    }
  }, [tableParam, dispatch]);

  // Guard: jika meja tidak ada, paksa kembali ke halaman pemilihan meja
  useEffect(() => {
    if (!tableParam && !table) {
      router.replace("/table");
    }
  }, [tableParam, table, router]);

  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((m) => m.category))),
  ];

  const handleAdd = (menu: (typeof menuItems)[0]) => {
    dispatch(addItem({ id: menu.id, name: menu.name, price: menu.price }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleContinue = () => {
    router.push("/payment");
  };

  const getQuantity = (id: number) =>
    order.find((item) => item.id === id)?.quantity || 0;

  const onScroll = () => {
    const scrollY = window.scrollY + 180; // + header height offset
    let currentCategory = "All";

    for (const cat of categories) {
      if (cat === "All") continue;
      const ref = sectionRefs.current[cat];
      if (ref && ref.offsetTop <= scrollY) {
        currentCategory = cat;
      }
    }
    setSelectedCategory(currentCategory as Category);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupedMenus = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as { [key: string]: typeof menuItems });

  return (
    <div className="min-h-screen bg-[#f5eee5] flex flex-col">
      <Header title={`Menu ${table ? `- Meja ${table}` : ""}`} showBack />

      <main className="px-5 pt-6 pb-[100px] max-w-md mx-auto w-full flex-grow">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Welcome to
          <br />
          QR Coffe
        </h1>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat as Category);
                if (cat === "All") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  sectionRefs.current[cat]?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-[#4b3621] text-white"
                  : "bg-transparent text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {categories
            .filter((cat) => cat !== "All")
            .map((cat) => (
              <div
                key={cat}
                ref={(el) => {
                  if (el) {
                    sectionRefs.current[cat] = el;
                  }
                }}
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {cat}
                </h2>
                <div className="space-y-4">
                  {groupedMenus[cat]?.map((menu) => (
                    <MenuCardItem
                      key={menu.id}
                      menu={menu}
                      quantity={getQuantity(menu.id)}
                      onAdd={() => handleAdd(menu)}
                      onRemove={() => handleRemove(menu.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 px-5 pb-5 pt-3 bg-[#f5eee5] border-t border-gray-200 max-w-md mx-auto">
        <button
          onClick={handleContinue}
          className="w-full bg-[#4b3621] text-white py-3 rounded-xl text-center font-semibold text-lg hover:bg-[#3c2d1d] transition"
        >
          {`Lanjutkan`}
        </button>
      </div>
    </div>
  );
}
