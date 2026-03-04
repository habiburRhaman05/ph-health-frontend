"use server"
import { serverApi } from "@/lib/serverApi"

export async function deleteOrderServerAction(orderId: string) {
  const res = await serverApi(`/orders/${orderId}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Delete failed")
  return res.json()
}