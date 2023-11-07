import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SettingLayoutProps {
  children: React.ReactNode;
}

function SettingLayout({ children }: SettingLayoutProps) {
  return (
    <div className="grid h-full grid-cols-[auto,1fr]">
      <nav className="relative flex h-full flex-col border-r-2">
        <div className="flex flex-col">
          <Label className="my-2 px-2 text-xl font-bold">Manage</Label>
          <Button variant="ghost" className="w-full justify-start text-base">
            User
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base">
            Customer
          </Button>
        </div>
        <div className="flex flex-col items-start">
          <Label className="my-2 px-2 text-xl font-bold">Report</Label>
          <Button variant="ghost" className="w-full justify-start text-base">
            Invoice
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base">
            Stock
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base">
            Lifetime
          </Button>
        </div>
        <div className="mt-auto text-center">
          <Button variant="ghost" className="px-10 text-base">
            Profile Setting
          </Button>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default SettingLayout;
