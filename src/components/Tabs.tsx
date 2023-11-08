import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Tabs({ children, ...props }: TabsProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center gap-2 rounded-lg px-2 outline outline-1 outline-stone-200",
        props.className,
      )}
    >
      {children}
    </div>
  );
}

interface TabItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabItem({ value, ...props }: TabItemProps) {
  return (
    <div
      {...props}
      className={cn(
        "cursor-pointer rounded px-2 text-slate-700 data-[active]:bg-slate-200 data-[active]:text-slate-800",
        props.className,
      )}
    >
      {value}
    </div>
  );
}
