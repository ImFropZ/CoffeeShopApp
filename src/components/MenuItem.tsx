import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  title: string;
}

function MenuItem({ imageSrc, title, ...props }: MenuItemProps) {
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);
  return (
    <div {...props} className={cn(props.className, "border")}>
      {!isImageLoaded ? <Skeleton className="aspect-square w-full" /> : null}
      <img
        src={imageSrc}
        alt={title}
        onLoad={() => {
          setImageLoaded(true);
        }}
      />
      <div className="my-2 text-center text-xl font-bold">{title}</div>
    </div>
  );
}

export default MenuItem;
