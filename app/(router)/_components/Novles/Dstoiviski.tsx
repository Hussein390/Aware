'use client'
import { AuthorData } from '@/app/api/server'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function Dstoiviski({ data }: { data: AuthorData[] }) {
  const colors = [
    {
      color: '#bd2d2d',
      margain: '2px',
    },
    {
      color: '#2196f3',
      margain: '7px',
    },
    {
      color: '#ff9800',
      margain: '10px',
    },
  ]
  const router = useRouter()
  return (
    <div className='p-3 rounded-md bg-white mt-2 '>
      <div className="flex justify-between p-1 text-black">
        <div className="flex gap-x-3">
          {colors.map(item => {
            return <span style={{ backgroundColor: item.color, marginTop: item.margain }} className='rounded-full size-4' key={item.color}></span>
          })}
        </div>
        <h1 className='mb-3 font-bold text-2xl pb-1 border-b-4 border-slate-400  w-fit'>الروايات</h1>
      </div>
      <div className="grid sm:grid-cols-2 w-full gap-2 " style={{ direction: 'rtl' }}>
        {data.length > 0
          ? data.map(item => {
            return (
              <div key={item.geturl} onClick={() => router.push(`/authors/${item.geturl})}`)} className="group border-2 font-sans cursor-pointer pb-3 rounded-b-md mt-3 rounded-t-xl bg-dark  mx-auto">
                <Image
                  src={`${item.img ?? '/hussein.png'}`}
                  alt=''
                  width={280}
                  height={170}
                  style={{
                    width: '100%',
                    height: '200px',
                  }}
                  className='rounded-t-xl object-cover'
                />

                <h1 className="font-semibold text-[20px] my-3 w-fit ml-auto mr-2 group-hover:animate-bounce text-white">{item.categoreyname ?? 'Hussein Saleem'}</h1>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center lg:items-start lg:flex-col gap-y-2 m-1 mb-3" style={{ direction: 'rtl' }}>
                  <span className="font-sans text-sm dark:text-slate-300  ">الكاتب: <span className="text-black font-bold dark:text-blue-200">{item.name ?? 'Hussein Saleem'}</span></span>
                  <span className="font-sans text-sm dark:text-slate-300  ">بصوت: <span className="text-black font-bold dark:text-blue-200">مأمون عليمات</span></span>
                </div>
                <div className="flex justify-between border-t p-1 pt-3 border-slate-300 items-center ">
                  <span className="font-sans  dark:text-[#7baab7] ">{item.maxtime ?? '16'}  ساعه</span>
                  <span className="font-sans relative dark:text-[#7baab7] flex items-center gap-x-2">

                    <Image
                      src={'/youtube.png'}
                      alt=''
                      width={25}
                      height={25}
                      className='group-hover:animate-bounce'
                    /> <small className='hidden group-hover:block p-1 rounded bg-slate-500 text-white absolute left-14 top-0 animate-pulse'>فيديو</small> {item.videonum}</span>

                </div>
              </div>
            )
          })
          : [1, 2].map(item => {
            return (
              <div className=" w-[300px] h-[200px] m-2" key={item}><Skeleton className='w-full h-full' /></div>
            )
          })}
      </div>
    </div>
  )
}
