import { TabItem, Tabs } from "@/components";
import { InvoiceDataTable, invoiceColumns } from "@/components/invoice";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getInvoices } from "@/lib/axios/invoices";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  endOfWeek,
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subDays,
  addDays,
  subWeeks,
  addWeeks,
  subMonths,
  addMonths,
  subYears,
  addYears,
} from "date-fns";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { DateRange } from "react-day-picker";
import { FaFileExcel, FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";

function InvoiceReport() {
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [reportType, setReportType] = useState<
    "daily" | "weekly" | "monthly" | "yearly" | "custom"
  >("daily");

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos", date],
    queryFn: () => getInvoices(date),
  });

  console.log(data);
  console.log(error);

  return (
    <div className="grid h-full grid-rows-[auto,1fr] p-2">
      <div className="flex gap-2 p-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-1/3 justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date.from && date.to ? (
                date.from == date.to ? (
                  format(date.from, "PPP")
                ) : (
                  `${format(date.from, "PPP")} - ${format(date.to, "PPP")}`
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="range"
              selected={date}
              onSelect={(e) => {
                setReportType("custom");
                if (e) setDate(e);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          onClick={() => {
            switch (reportType) {
              case "daily":
                if (date.from && date.to) {
                  setDate({
                    from: subDays(date.from, 1),
                    to: subDays(date.to, 1),
                  });
                }
                break;
              case "weekly":
                if (date.from && date.to) {
                  setDate({
                    from: subWeeks(date.from, 1),
                    to: subWeeks(date.to, 1),
                  });
                }
                break;
              case "monthly":
                if (date.from && date.to) {
                  setDate({
                    from: subMonths(date.from, 1),
                    to: subMonths(date.to, 1),
                  });
                }
                break;
              case "yearly":
                if (date.from && date.to) {
                  setDate({
                    from: subYears(date.from, 1),
                    to: subYears(date.to, 1),
                  });
                }
                break;
            }
          }}
        >
          <FaLessThan />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            switch (reportType) {
              case "daily":
                if (date.from && date.to) {
                  setDate({
                    from: addDays(date.from, 1),
                    to: addDays(date.to, 1),
                  });
                }
                break;
              case "weekly":
                if (date.from && date.to) {
                  setDate({
                    from: addWeeks(date.from, 1),
                    to: addWeeks(date.to, 1),
                  });
                }
                break;
              case "monthly":
                if (date.from && date.to) {
                  setDate({
                    from: addMonths(date.from, 1),
                    to: addMonths(date.to, 1),
                  });
                }
                break;
              case "yearly":
                if (date.from && date.to) {
                  setDate({
                    from: addYears(date.from, 1),
                    to: addYears(date.to, 1),
                  });
                }
                break;
            }
          }}
        >
          <FaGreaterThan />
        </Button>
        <Tabs className="ml-auto">
          <TabItem
            value="Daily"
            data-active={reportType === "daily" ? true : undefined}
            onClick={() => {
              setDate({
                from: new Date(),
                to: new Date(),
              });
              setReportType("daily");
            }}
          />
          <TabItem
            value="Weekly"
            data-active={reportType === "weekly" ? true : undefined}
            onClick={() => {
              setDate({
                from: startOfWeek(new Date()),
                to: endOfWeek(new Date()),
              });
              setReportType("weekly");
            }}
          />
          <TabItem
            value="Monthly"
            data-active={reportType === "monthly" ? true : undefined}
            onClick={() => {
              setDate({
                from: startOfMonth(new Date()),
                to: endOfMonth(new Date()),
              });
              setReportType("monthly");
            }}
          />
          <TabItem
            value="Yearly"
            data-active={reportType === "yearly" ? true : undefined}
            onClick={() => {
              setDate({
                from: startOfYear(new Date()),
                to: endOfYear(new Date()),
              });
              setReportType("yearly");
            }}
          />
          <TabItem
            value="Custom"
            className="cursor-not-allowed text-slate-400"
            data-active={reportType === "custom" ? true : undefined}
          />
        </Tabs>
        <Button variant="outline">
          <FaFileExcel className="scale-125 text-green-700" />
        </Button>
      </div>
      <div className="grid grid-rows-[auto,1fr] gap-y-2 rounded-lg bg-slate-200 p-2 shadow">
        <div className="rounded bg-slate-100 pb-4">
          <h1 className="px-2 text-2xl font-bold underline">Invoice Reports</h1>
          <div className="flex justify-center gap-10">
            <div className="flex flex-col items-center">
              <Label className="my-1 text-xl font-bold">Coffee</Label>
              <div className="relative h-52 w-52">
                <Pie
                  className="absolute inset-0 h-full w-full"
                  data={{
                    labels: ["Coffee 1", "Coffee 2"],
                    datasets: [
                      {
                        label: "# of Sales",
                        data: [5, 10],
                        backgroundColor: ["#DD7E48", "#9D3900"],
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Label className="my-1 text-xl font-bold">Customer</Label>
              <div className="relative flex h-52 w-52">
                <Pie
                  className="absolute inset-0 h-full w-full"
                  data={{
                    labels: ["Customer 1", "Customer 2"],
                    datasets: [
                      {
                        label: "# of Invoices",
                        data: [5, 10],
                        backgroundColor: ["#0002", "#0003"],
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative rounded bg-slate-50">
          <InvoiceDataTable columns={invoiceColumns} data={data || []} />
        </div>
      </div>
    </div>
  );
}

export default InvoiceReport;
