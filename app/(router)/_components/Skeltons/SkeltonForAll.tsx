import { Skeleton } from "@/components/ui/skeleton"

type Styles = {
  width: string,
  height: string,
  mdHeight: string,
  mdWidth: string,
  margain: string
}
export default function SkeltonForAll({width, height, mdWidth = '100%', mdHeight = '70px', margain = '1px'}: Styles) {
  return (
    <div className={`m-${margain} w-${width} h-${height} md:w-${mdWidth} md:h-${mdHeight} rounded-md`}>
      <Skeleton  className='w-full z-50 h-full '/>
    </div>
  )
}
