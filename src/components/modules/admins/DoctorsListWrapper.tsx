"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import ManageDoctorsTable from "./DoctorsTable";
import { getDoctors } from "@/services/admin.services";
import { queryKeys } from "@/lib/react-query-keys";
import { ApiResponse } from "@/interfaces/response";
import { IDoctor } from "@/interfaces/doctor";

const DoctorsListWrapper = () => {
  // Get current page from URL
  const params = useSearchParams();
  const page = Number(params.get("page") ?? 1);

  // Fetch doctors with React Query
  const { data: doctorsData, isLoading, isFetching } = useQuery<
    ApiResponse<IDoctor[]>
  >({
    queryKey: [queryKeys.FETCH_DOCTOR_LIST_BY_ADMIN, { page }],
    queryFn: () => getDoctors(page),
    staleTime: 1000 * 60 * 2, // 2-minute cache
    refetchOnWindowFocus: false,
  });
console.log(doctorsData);

  return (
    <div className="p-6 space-y-6">
      {/* Header / Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Manage Doctors</h1>
        <p className="text-sm text-muted-foreground">
          View, edit, and manage all doctors in the system. Use pagination to navigate through the list.
        </p>
      </div>

      {/* Table */}
 
        <ManageDoctorsTable
          doctors={doctorsData?.data ?? []}
          isLoading={isLoading || isFetching}
          pagination={doctorsData?.meta}
        />

    </div>
  );
};

export default DoctorsListWrapper;