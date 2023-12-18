import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  categories: {
    name: string;
    isActive: boolean;
  }[];
  _onSelect: (cateName: string) => void;
}

function CategoriesSlide({ categories, _onSelect, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        "my-2 flex w-full gap-2 overflow-x-auto pb-4",
        props.className,
      )}
    >
      {categories.map((cat) => (
        <div
          className="grid flex-shrink-0 cursor-pointer select-none place-items-center rounded-3xl border-2 px-4 py-1 capitalize data-[state='active']:border-black"
          data-state={cat.isActive ? "active" : undefined}
          onClick={() => {
            cat.isActive ? _onSelect("") : _onSelect(cat.name);
          }}
          key={cat.name}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
}

export default CategoriesSlide;
