'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { AuthersData } from '@prisma/client'
import Image from 'next/image'
import {  useRouter } from 'next/navigation'
import React from 'react'


export default function Course({data}: {data: AuthersData[]}) {
 
  const router = useRouter()
  return (
    <div className='mt-10 col-span-3' style={{direction: 'rtl'}}> 
      <div className="grid  sm:grid-cols-3 gap-3">
      {data.length > 0 || data !== null ? data!.slice(0, 3).map((item, id) => {
        return (
          <div onClick={()=> router.push(`/authors/${item.geturl}`)} className="rounded-t-xl  dark:bg-n2dark border border-slate-400 cursor-pointer group" key={id}>
            <div className="w-full h-[190px] relative">
            <Image
              src={item.img}
              alt=''
                fill
                sizes='100% 100%'
              className='rounded-t-xl object-cover'
            />
            </div>
              
            <div className="p-2 flex flex-col">
            <h1 className="font-sans dark:text-slate-100 mb-3  text-right  md:text-lg font-bold mt-1">{item.categoreyname}</h1>
              <div className="flex justify-between pb-3 font-sans">
                <span className="font-semibold  text-slate-500 dark:text-slate-300 text-sm">{item.name}</span>
                <span className="font-semibold  text-slate-500 dark:text-slate-300 text-sm">{item.free}</span>
              </div>
              <div className="flex justify-between border-t pt-3 border-slate-300 items-center font-sans">
                <span className="dark:text-[#7baab7] ">{item.maxtime}  ساعه</span>
                <span className="dark:text-[#7baab7] flex items-center gap-x-2 relative">
                    <Image
              src={'/youtube.png'}
              alt=''
              width={25}
              height={25}
              className='group-hover:animate-bounce'
              /> <small className='hidden group-hover:block p-1 rounded bg-slate-900 text-white absolute left-14 top-0 animate-pulse'>فيديو</small> {item.videonum}</span>
              </div>
            </div>

          </div>
        )
      }):[1, 2, 3].map(item => {
        return (
          <div className=" w-[300px] h-[200px] m-2" key={item}><Skeleton  className='w-full h-full'/></div>
        )
      })
        
}
</div>
      
    </div>
  )
}
