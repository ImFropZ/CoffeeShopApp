import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";

export type Stock = {
  id: string;
  name: string;
};

export const stockColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const stock = row.original;
      return (
        <div>
          <Button>View Details</Button>
        </div>
      );
    },
  },
];

export type StockItem = {
  id: string;
  expireDate: string;
  quantity: number;
  price: number;
};

export const stockItemColumns: ColumnDef<StockItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "expireDate",
    header: "Expire Date",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    header: "Actions",
    accessorFn: (row) => {
      return <div>{row.id}</div>;
    },
  },
];
