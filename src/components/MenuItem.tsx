import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  title: string;
}

function MenuItem({ imageSrc, title, ...props }: MenuItemProps) {
  return (
    <div {...props} className={cn(props.className, "border")}>
      <img src={imageSrc} alt={title} />
      <div className="text-center my-2 font-bold text-xl">{title}</div>
    </div>
  );
}

export default MenuItem;
