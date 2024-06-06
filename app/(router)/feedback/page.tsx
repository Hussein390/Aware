import { GetAllAutherData, getFeedbacks } from "@/app/api/server";
import { Filter } from "./_components/Filter";
import { headers } from "next/headers";

export default async function page() {
  const authors = await GetAllAutherData()
   const headersList = headers();
  const pathname = headersList.get('x-url' || 'Hussein')
  const feedbacks = await getFeedbacks(pathname!)
  if(authors === undefined) return
  return (
    <div>
      <Filter authors={authors} feedbacks={feedbacks} />
    </div>
  )
}
