import DoctorsListWrapper from "@/components/modules/admins/DoctorsListWrapper"
import { getDoctors } from "@/services/admin.services"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string }
}) {

  const page = Number( searchParams?.page ?? 1)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["doctors", page],
    queryFn: () => getDoctors(page),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorsListWrapper />
    </HydrationBoundary>
  )
}