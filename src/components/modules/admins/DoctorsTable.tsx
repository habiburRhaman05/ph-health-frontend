"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Mail, MoreVertical, Trash2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDoctor } from "@/interfaces/doctor";
import { IPagination } from "@/interfaces/response";
import { UpdateDoctorModal } from "./UpdateDoctorModal";
import { DeleteDoctorModal } from "./DeleteDoctorModal";

export default function ManageDoctorsTable({
  doctors,
  isLoading,
  pagination = { page: 1, limit: 0, total: 0, totalPages: 1 },
}: {
  doctors: IDoctor[];
  isLoading: boolean;
  pagination: IPagination | any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPageQuery = Number(searchParams.get("page")) || pagination?.page;

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);
  const [pageIndex, setPageIndex] = useState(currentPageQuery - 1);
  const [search, setSearch] = useState(""); // search input
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

  useEffect(() => {
    setPageIndex(currentPageQuery - 1);
  }, [currentPageQuery]);

  // -------------------- Columns --------------------
  const columns = useMemo<ColumnDef<IDoctor>[]>(
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
        accessorKey: "designation",
        header: "Designation",
        cell: ({ row }) => <div>{row.original.designation}</div>,
      },
      {
        header: "Contact",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> {row.original.email}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "appointmentFee",
        header: () => <span>Fee 💲</span>,
        cell: ({ row }) => <span>${row.original.appointmentFee}</span>,
        enableSorting: true,
      },
      {
        accessorKey: "user.status",
        header: () => <span>Status</span>,
        cell: ({ row }) => (
          <Badge
            className={
              row.original.user.status === "ACTIVE"
                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10"
                : "bg-gray-200 text-gray-700"
            }
          >
            {row.original.user.status}
          </Badge>
        ),
        enableSorting: true,
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
                onClick={() => {
                  setSelectedDoctor(row.original);
                  setEditModal(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
              className="bg-destructive"
                onClick={() => {
                  setSelectedDoctor(row.original);
                  setDeleteModal(true);
                }}
              >
                Delete
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

  // -------------------- Filter Data Locally --------------------
  const filteredData = useMemo(() => {
    if (!search) return doctors;
    const lowerSearch = search.toLowerCase();
    return doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(lowerSearch) ||
      doctor.designation.toLowerCase().includes(lowerSearch) ||
      doctor.email.toLowerCase().includes(lowerSearch)
    );
  }, [search, doctors]);

  // -------------------- React Table --------------------
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // ---------------- Pagination Handlers ----------------
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPageIndex(newPage);
    router.push(`?page=${newPage}`, { scroll: false });
  };

  return (
    <div className="w-full space-y-4">
      {/* ---------------- Search Input ---------------- */}
      <div className="flex justify-end bg-transparent">
        <div className="relative w-80 bg-transparent ">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search doctor, email, designation..."
            className="border rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-card shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

 
      {/* ---------------- Table ---------------- */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs uppercase font-semibold cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, j) => (
                      <TableCell key={j} className="py-3">
                        <Skeleton className="h-5 w-full rounded-md" />
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

      {/* ---------------- Edit Modal ---------------- */}
      {editModal && selectedDoctor && (
        <UpdateDoctorModal
          isOpen={editModal}
          setIsOpen={setEditModal}
          doctor={selectedDoctor}
        />
      )}
      {deleteModal && selectedDoctor && (
        <DeleteDoctorModal
          isOpen={deleteModal}
          setIsOpen={()=> setDeleteModal(false)}
          doctorEmail={selectedDoctor.email}
          doctorId={selectedDoctor.id}
        />
      )}

      {/* ---------------- Pagination ---------------- */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground font-medium">
          Total Doctors: {filteredData.length}
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium">
            Page {pagination.page} of {pagination.totalPages || 1}
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
              disabled={pagination.page >= (pagination.totalPages || 1)}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}