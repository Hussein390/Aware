'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { people } from '@/app/(router)/_components/News';

export default function Author({ path }: { path: string }) {
  
  function extractNumbersFromString(str: string): RegExpMatchArray | null {
    return str.match(/\d/);
  }
  
  const authorId: RegExpMatchArray | null = extractNumbersFromString(path);
  const parsedAuthorId: number | null = authorId ? parseInt(authorId[0], 10) : null;
  const [isOpen, setIsOpen] = useState(false)
  const author = parsedAuthorId !== null ? people[parsedAuthorId - 1] : null;
  const data = author!;
  
  const width = typeof window !== 'undefined' ? window.innerWidth : 1300;
  useEffect(() => {
    if (width >= 600) setIsOpen(true)
  },[width])

  return (
    <div className='p-4 pb-14  '>
      <div className="">
      <div className="">
      <h1 className='font-bold text-2xl md:text-3xl mb-5 ' style={{ color: data.color }}>{data.name}</h1>
      <div className=" mb-5 flex flex-col justify-between md:flex-row ">
        <Image
          src={`/${data.img}`}
          width={isOpen? 300 : 200}
          height={isOpen? 300 : 200}
          alt=''
          priority
          className='rounded-md drop-shadow-xl object-cover h-fit'
            />
            <div className=" sm:w-[400px] md:w-[500px] h-fit  p-4 bg-white grid md:grid-cols-3 gap-x-2 gap-y-3 mr-4 rounded-lg mt-5 ">
          {data.youtube?.map((item, index) => (
  <div key={index}>
    <Link href={`/${data.name.toLowerCase().replaceAll(' ', '-')}${data.id}/1`} className='relative inline'>
      <div>
        {item.one}
        <span className="absolute top-0 left-0 z-20 hover:bg-black hover:bg-opacity-25 rounded-md w-full h-full"></span>
      </div>
    </Link>
    <Link href={`/${data.name.toLowerCase().replaceAll(' ', '-')}${data.id}/2`} className='relative inline'>
      <div>
        {item.two}
        <span className="absolute top-0 left-0 z-20 hover:bg-black hover:bg-opacity-25 rounded-md w-full h-full"></span>
      </div>
    </Link>
    <Link href={`/${data.name.toLowerCase().replaceAll(' ', '-')}${data.id}/3`} className='relative inline'>
      <div>
        {item.three}
        <span className="absolute top-0 left-0 z-20 hover:bg-black hover:bg-opacity-25 rounded-md w-full h-full"></span>
      </div>
    </Link>
  </div>
))}

      </div>
      </div>
      <div className="px-2 md:w-[600px] lg:w-[800px] ">
  {parsedAuthorId === 1 ? (
    <>
      <p className="text-lg font-bold mb-5 dark:text-slate-50">{data.description?.slice(0, 19)}</p>
      <span className="dark:text-slate-300 text-[15px] text-slate-600 font-semibold leading-6 ">{data.description?.slice(19, 503)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(503, 1002)}</span>
      <p className="mt-5 text-lg font-bold">{data.description?.slice(1002, 1030)}</p>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(1030, 1437)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(1437, 1962)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(1962, 2317)}</span>
            <p className="mt-5 text-lg font-bold">{data.description?.slice(2317, 2359)}</p>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(2359, 2790)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(2790, 3198)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(3198, 3743)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(3743, 4400)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(4400, 5057)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(5057, 5459)}</span>
    </>
  ) : parsedAuthorId === 3 ? (
    <>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(0, 498)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(498, 840)}</span>
    <p className="text-xl font-bold my-5">{data.description?.slice(840, 850)}</p>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(850, 1106)}</span>
    <p className="text-xl font-bold my-5">{data.description?.slice(1106, 1119)}</p>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(1119, 1677)}</span>
    <p className="text-xl font-bold my-5">{data.description?.slice(1677, 1688)}</p>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(1688, 2042)}</span>
    <p className="text-xl font-bold my-5">{data.description?.slice(2042, 2054)}</p>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(2054, 2258)}</span>
    <p className="text-xl font-bold my-5">{data.description?.slice(2258, 2266)}</p>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(2266, 2750)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(2750, 3290)}</span>
    <p className="text-xl font-bold my-5">{data.description?.slice(3290, 3303)}</p>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(3303, 4090)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(4000, 4339)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(4339, 4800)}</span>

    </>
  ) : parsedAuthorId === 2 ? (
                  
    <>
      <span className="dark:text-slate-300 text-[15px] mt-3 block text-slate-600 font-semibold leading-6">{data.description?.slice(0, 870)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(870, 1524)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(1524, 1839)}</span>
      
      <p className="text-xl font-bold my-5">{data.description?.slice(1839, 1862)}</p>
      <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(1862, 2222)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(2222, 2660)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(2660, 3099)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(3099, 3737)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(3737, 4339)}</span>
      <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(4339, 4808)}</span>
                    
      <p className="text-xl font-bold my-5">{data.description?.slice(4808, 4824)}</p>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(4824, 5303)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(5303, 5943)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(5943, 6463)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(6463, 7202)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(7202, 7866)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(7866, 8181)}</span>
    
                    
    <p className="text-xl font-bold my-5">{data.description?.slice(8181, 8198)}</p>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(8198, 8753)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(8753, 9315)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(9315, 9939)}</span>
                    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(9939, 10184)}</span>
                    
    <p className="text-xl font-bold my-5">{data.description?.slice(10184, 10207)}</p>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(10207, 10880)}</span>
    <span className="dark:text-slate-300 text-[15px] mt-4 block text-slate-600 font-semibold leading-6">{data.description?.slice(10880, 11700)}</span>
    
    </>
            )
: <p>{data.description}</p>}
      </div>
        </div>
        
      
      </div>


      <Link className='p-1 px-2 text-slate-50 bg-blue-400 hover:bg-blue-500 rounded sticky bottom-4 float-end' href={'/'}>Back</Link>
    </div>
  )
}
