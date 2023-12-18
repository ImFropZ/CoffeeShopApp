import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import Table from "@/components/pdf/table/Table";

function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-5 p-2">
        <h1 className="cursor-pointer text-2xl font-bold">Dashboard</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="group ml-auto mr-5 flex items-center gap-2 rounded px-2 text-lg outline outline-stone-300">
            <span>Report</span>{" "}
            <IoIosArrowDown className="transition-all group-aria-[expanded='true']:rotate-180" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex flex-col gap-2">
              <DropdownMenuItem>
                <Link to="/report/invoice" className="w-full">
                  Invoice
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/report/stock" className="w-full">
                  Stock
                </Link>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mx-4 flex justify-between gap-5 rounded p-5">
        <span className="text-2xl font-bold">Total:</span>
        <div className="w-full rounded bg-slate-200 px-4 py-2 shadow">
          <Label className="text-xl">Income</Label>
          <p className="text-3xl font-bold text-green-600">$500.00</p>
        </div>
        <div className="w-full rounded bg-slate-200 px-4 py-2 shadow">
          <Label className="text-xl">Expend</Label>
          <p className="text-3xl font-bold text-red-600">- $500.00</p>
        </div>
        <div className="w-full rounded bg-slate-200 px-4 py-2 shadow">
          <Label className="text-xl">Profit</Label>
          <p className="text-3xl font-bold text-green-600">$0.00</p>
        </div>
      </div>
      <div className="px-5 text-lg font-bold">Quick Links:</div>
      <div className="mx-4 flex w-1/4 flex-col gap-5 rounded p-5">
        <Button variant="outline">
          <Link to="/setting/profile">Edit your profile</Link>
        </Button>
        <Button variant="outline">
          <Link to="/setting/manage-user">Manage users</Link>
        </Button>
        <Button variant="outline">
          <Link to="/setting/manage-customer">Manage customers</Link>
        </Button>
      </div>

      <Table
        data={{
          items: [
            {
              id: "1",
              name: "test",
              price: "100",
            },
            {
              id: "2",
              name: "test",
              price: "100",
            }
          ],
        }}
      />
    </div>
  );
}

export default Dashboard;
