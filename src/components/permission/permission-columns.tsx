import { ColumnDef } from "@tanstack/react-table";

export type Permission = {
  id: string;
  name: string;
  description: string;
};

export const permissionColumns: ColumnDef<Permission>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    header: "Name",
    cell: ({ cell }) => {
      return <div>{cell.row.original.name}</div>;
    },
  },
  {
    header: "Description",
    cell: ({ cell }) => {
      return <div>{cell.row.original.description}</div>;
    },
  },
  {
    header: "Actions",
    cell: () => {
      return <div>Actions</div>;
    },
  },
];
