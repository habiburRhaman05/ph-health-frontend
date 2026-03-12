"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Mail, Phone, Trash2, MoreVertical } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// ---------------- Types ----------------
type Specialty = { specialty: { title: string } };
type Doctor = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  experience: number;
  appointmentFee: number;
  designation: string;
  specialtys: Specialty[];
  user: { status: string };
};
interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

// ---------------- Component ----------------
export default function ManageDoctorsTable({
  doctors,
  isLoading,
  pagination,
  onPageChange, // callback to fetch data for a specific page
}: {
  doctors: Doctor[];
  isLoading: boolean;
  pagination: Meta;
  onPageChange: (page: number) => void;
}) {

  if(!pagination) return <h1>loadingn</h1>
  const router = useRouter();
  const searchParams = useSearchParams();

  // ---------------- Current Page ----------------
  const currentPageQuery = Number(searchParams.get("page")) || pagination?.page;
  const [pageIndex, setPageIndex] = useState(currentPageQuery - 1);

  useEffect(() => {
    setPageIndex(currentPageQuery - 1);
  }, [currentPageQuery]);

  // ---------------- Columns ----------------
  const columns = useMemo<ColumnDef<Doctor>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Doctor",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border">
              <AvatarImage src={row.original.profilePhoto || ""} />
              <AvatarFallback>
                {row.original.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <span className="font-medium text-sm">{row.original.name}</span>
              <span className="text-xs text-muted-foreground">
                {row.original.designation}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "specialtys",
        header: "Specialties",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {row.original.specialtys.map((s, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-[10px] font-normal"
              >
                {s.specialty.title}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        header: "Contact",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> {row.original.email}
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> {row.original.experience} yrs Exp
            </div>
          </div>
        ),
      },
      {
        accessorKey: "appointmentFee",
        header: "Fee",
        cell: ({ row }) => <span className="font-medium">${row.original.appointmentFee}</span>,
      },
      {
        accessorKey: "user.status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className={
              row.original.user.status === "ACTIVE"
                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10"
                : ""
            }
          >
            {row.original.user.status}
          </Badge>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(row.original.id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  // ---------------- Table ----------------
  const table = useReactTable({
    data: doctors,
    columns,
    pageCount: pagination.totalPage,
    state: { pagination: { pageIndex, pageSize: pagination.limit } },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  // ---------------- Pagination Handlers ----------------
  const handlePageChange = (newPage: number) => {
   
    if (newPage < 1 || newPage > pagination.totalPage) return;
    setPageIndex(newPage);

    // update URL query
    router.push(`?page=${newPage}`, { scroll: false });

    // trigger API refetch
    onPageChange(newPage);
  };

  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs uppercase font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: pagination.limit }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground font-medium">
          Total Doctors: {pagination.total}
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium">
            Page {pagination.page} of {pagination.totalPage}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.totalPage}
              onClick={() => handlePageChange(Number(currentPageQuery) + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}