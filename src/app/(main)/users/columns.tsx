"use client";
import type { User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

function formatFullName(firstName: string | null, lastName: string | null) {
  return `${firstName ?? ""} ${lastName ?? ""}`.trim() ?? "";
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row?.original?.imageUrl ?? ""}
        alt={`${formatFullName(row?.original?.firstName, row?.original?.lastName)}`}
        width={50}
        height={50}
        style={{ borderRadius: "50%" }}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) =>
      `${formatFullName(row?.original?.firstName, row?.original?.lastName)}`,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
