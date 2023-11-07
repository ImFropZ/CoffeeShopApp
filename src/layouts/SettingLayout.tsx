import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface SettingLayoutProps {
  children: React.ReactNode;
}

function SettingLayout({ children }: SettingLayoutProps) {
  return (
    <div className="grid h-full grid-cols-[auto,1fr]">
      <nav className="relative flex h-full flex-col border-r-2">
        <div className="flex flex-col">
          <Label className="my-2 px-2 text-xl font-bold">Manage</Label>
          <Link to="/setting/manage-user">
            <Button variant="ghost" className="w-full justify-start text-base">
              User
            </Button>
          </Link>
          <Link to="/setting/manage-customer">
            <Button variant="ghost" className="w-full justify-start text-base">
              Customer
            </Button>
          </Link>
        </div>
        <div className="flex flex-col">
          <Label className="my-2 px-2 text-xl font-bold">Report</Label>
          <Link to="/setting/report-invoice">
            <Button variant="ghost" className="w-full justify-start text-base">
              Invoice
            </Button>
          </Link>
          <Link to="/setting/report-stock">
            <Button variant="ghost" className="w-full justify-start text-base">
              Stock
            </Button>
          </Link>
          <Link to="/setting/report-lifetime">
            <Button variant="ghost" className="w-full justify-start text-base">
              Lifetime
            </Button>
          </Link>
        </div>
        <div className="mt-auto text-center">
          <Link to="/setting/user">
            <Button variant="ghost" className="px-10 text-base">
              Profile Setting
            </Button>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default SettingLayout;
