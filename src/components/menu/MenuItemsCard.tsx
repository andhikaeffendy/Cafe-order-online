import Image from "next/image";
import { formatPrice } from "@/utils/format";

type Menu = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
};

type Props = {
  menu: Menu;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

export default function MenuCardItem({
  menu,
  quantity,
  onAdd,
  onRemove,
}: Props) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 relative">
          <Image
            src={menu.image}
            alt={menu.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div>
          <p className="text-base font-semibold text-gray-800">{menu.name}</p>
          <p className="text-sm text-gray-500">{menu.description}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="text-sm font-semibold text-gray-800">
          {formatPrice(menu.price)}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={onRemove}
            className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full"
          >
            -
          </button>
          <span className="text-sm font-medium w-4 text-center text-black ">
            {quantity}
          </span>
          <button
            onClick={onAdd}
            className="w-6 h-6 flex items-center justify-center bg-gray-800 text-white rounded-full"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
