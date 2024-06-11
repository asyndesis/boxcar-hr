"use client";
import type { User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row?.original?.imageUrl ?? ""}
        alt={`${row?.original?.firstName} ${row?.original?.lastName}`.trim()}
        width={50}
        height={50}
        style={{ borderRadius: "50%" }}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
