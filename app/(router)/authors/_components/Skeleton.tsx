import { Skeleton } from "@/components/ui/skeleton"

export async function SkeletonIFrame() {
  return (
    <div className="m-5 w-[350px] h-[190px] md:w-[600px] md:h-[420px] rounded-md">
      <Skeleton  className='w-full z-50 h-full bg-slate-200'/>
    </div>
  )
}
