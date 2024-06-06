'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { SkeletonIFrame } from './Skeleton';
import IFrame from './Frame';
import { AuthorData, Category, editCompleted, increaseNumber } from '@/app/api/server';
import {PostId }from './PostId';

export const PathId = () => {
  const pathname = usePathname();
  const authorId = pathname.match(/\d+/);
  const id = authorId && parseInt(authorId[0], 10);
  return id;
  }
export default function Avideo({ ids, category }: { ids: any, category: any }) {
  const router = useRouter()
  const pathname = usePathname()
  const [active, setActive] = useState(false);

const handleCompleted = async (item: any) => {
  setActive(prev => !prev);
  const completed = !active;

  await editCompleted(item.id, completed, pathname);

  const newCompletedVideos = item.completed ? ids.completedvideos > 0? ids.completedvideos - 1: 0 : ids.completedvideos + 1 ;

  console.log(await increaseNumber(ids.id, newCompletedVideos, pathname));
};
  return (
    <div className=''>

      <div className={` h-[250px] sm:h-[330px]  md:h-[390px] lg:w-[700px] lg:h-[400px] rounded-xl`}>
        <Suspense fallback={<SkeletonIFrame />}>
        <IFrame src={category.src}/>
        </Suspense>
      </div>
      <h3 className="font-bold text-2xl dark:text-slate-300 mt-4 text-right">مقتبس من الفيديو</h3>
      <p style={{ direction: 'rtl' }} className="dark:text-slate-300 text-slate-800 font-sans leading-9 text-lg mt-3">
        {category.describtion.length > 700 ? <>
          <span style={{ direction: 'rtl' }}>{category.describtion.slice(0, 500)}</span>
          <span style={{ direction: 'rtl' }} className="mt-4 block ">{category.describtion.slice(500,)}</span>
        </> : category.describtion}</p>
      
      <div className="flex items-center justify-between my-4">
      <button style={{background: category.completed? '#2e7d32': '#888'}} className='p-1 px-2 mr-3 text-slate-50 mb-3  hover:bg-blue-500 rounded' onClick={()=> handleCompleted(category)} >{category.completed?'Completed': 'Uncompleted'}</button>
      <button className='p-1 px-2 mr-3 text-slate-50 mb-3 bg-blue-400 hover:bg-blue-500 rounded' onClick={() => router.back()}>Back</button>
      </div>

    </div>
  )
}