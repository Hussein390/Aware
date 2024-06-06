'use client'
import { AuthorData, GetAllAutherData } from '@/app/api/server';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

export default function Profile({completedCourses}:{completedCourses: AuthorData[]}) {
  const router = useRouter();
  const { status, data: session } = useSession();


  function getPrecent(item: any) {
    const data = (item.completedvideos / item.videonum) * 100;
    return data.toFixed(2)
}
  return (
    <div className=" mx-3">
      <div className='w-fit mx-auto md:mx-6 mt-7 rounded-t-md'>
        <Image
          src={`${session?.user?.image ?? '/hussein.png'}`}
          width={200}
          height={170}
          alt=''
          style={{width: '320px', height: '350px'}}
          className=' object-cover rounded-t-md'
        />
        <div className="p-1 mt-3 w-[320px] rounded-md bg-white">
          <div className="mb-2 p-2 gap-x-2 items-center text-right flex justify-between">
            <span className="font-bold p-3 rounded-md text-left w-full h-full text-white bg-n2dark">{session?.user?.name ?? 'Hussein Saleem'}</span>
            <span className="font-semibold text-lg text-slate-900">الاسم</span>
          </div>
          <div className="mb-2 p-2 gap-x-2 items-center text-right flex justify-between">
            <span className="font-bold p-3 rounded-md text-left w-full h-full text-white bg-n2dark">{session?.user?.email ?? 'HusseinSaleem@gmail.com'}</span>
            <span className="font-semibold text-lg text-slate-900 mr-1">الايميل</span>
          </div>
        <Button className='w-full' variant={'destructive'} onClick={() => signOut()}>
          LogOut <LogOut className='ml-1 text-xs' size={16} />
        </Button>
        </div>
        <button
          className='p-1 px-2 mr-3 text-slate-50 mb-3 bg-blue-400 hover:bg-blue-500 rounded mt-4 bottom-4 float-end'
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <div className="grid  sm:grid-cols-2  gap-4 w-full md:w-[500px] lg:w-[660px] mb-4 pt-10">
      {completedCourses.length > 0? completedCourses.map(item => (
        <div key={item.geturl} className="rounded-md border bg-dark border-black dark:border-[#00bcd4] ">
          <div className="w-full h-[190px] relative">
            <Image
              src={item.img}
              alt=''
              fill
              sizes='100%'
              className='rounded-t-xl object-cover'
            />
          </div>
          <h1 className="text-black dark:text-slate-100 text-right pr-2 text-lg font-sans mt-1">{item.categoreyname}</h1>
          <div className="p-2 mt-1">
            <div className="flex justify-between pb-2">
              <span className="font-sans text-slate-500 dark:text-slate-300 group-hover:animate-pulse">شاهدت {<span className='text-blue-500'>{item.completedvideos }</span>} من {item.videonum}</span>
              <span className="font-sans text-slate-500 dark:text-slate-400">{item.name}</span>
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-white text-sm mb-1" >{ getPrecent(item)}%</h3>
              <Progress value={parseInt(getPrecent(item))} className='h-[7px] progressColor bg-slate-700'/>
            </div>
          </div>
        </div>
      )) : [1, 2, 3, 4].map(item => {
        return (
          <div className=" w-full h-[220px]" key={item}><Skeleton  className='w-full h-full'/></div>
        )
      })}
      </div>
    </div>
  );
}
