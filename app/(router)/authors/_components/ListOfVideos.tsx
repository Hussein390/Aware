'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link';
import { AuthorData, Authors } from '@/app/api/server';
import { Skeleton } from '@/components/ui/skeleton';
import { authorsData } from '../../_components/GlobalAPI';

export default function ListOfVideos({ path, data }: { path: string, data: AuthorData[] }) {
  const router = useRouter()
  function extractNumbersFromString(str: string): RegExpMatchArray | null {
    return str.match(/\d+/);
  }
  const authorId = extractNumbersFromString(path);
  const parsedAuthorId = authorId ? parseInt(authorId[0], 10) : null;
  const regex = /^\d+:/;
  return (
    <div className="p-4 " style={{direction: 'rtl'}}>
      <h1 className="font-semibold text-right p-2 text-black dark:text-slate-100 text-xl md:text-3xl ">جميع <span className='animate-bounce inline-block'>فيدوهات</span> {data !== null ? data[parsedAuthorId!].categoreyname : 'Hussein'} </h1>
      <p className="dark:to-slate-300 mt-2 px-1 lg:w-[690px] font-sans ml-auto">{ data[parsedAuthorId!].description}</p>
      
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-5  p-4 rounded-xl dark:shadow-2xl dark:shadow-slate-500  bg-slate-100 dark:bg-n2dark'>
        {data.length > 0 ? data[parsedAuthorId!].categories.map((item, id) => {
          return (
              <div key={id} onClick={() => router.push(`/authors/${item.geturl}/${item.meid}`)} className="rounded-t-xl border bg-n2dark  border-black dark:border-[#00bcd4] cursor-pointer group" >
                <div className="w-full h-[190px] relative">
                  <Image
                    src={item.img}
                    alt=''
                    fill
                    sizes='100% 100%'
                    className='rounded-t-xl object-cover'
                  />
                </div>

                <h1 className="text-slate-100 text-right pr-2 text-lg font-sans mt-1">{item.videoname}</h1>
                <div className="p-2 mt-1">
                  <div className="flex justify-between pb-2">
                    
                    <span className="font-sans text-slate-300 group-hover:animate-pulse">{item.free}</span>
                    <span className="font-sans text-slate-300 ">{item.name}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 border-slate-300 items-center">
                    <span className="font-sans  text-[#b3b2b5] ">{regex.test(item.minunts) ? `${item.minunts}  ساعه` : `${item.minunts}  دقيقه`}</span>
                    <span className="font-sans  text-[#b3b2b5] flex items-center gap-x-2">
                      <Image
                        src={'/youtube.png'}
                        alt=''
                        width={25}
                        height={25}
                        style={{ width: '25px', height: '25px' }}
                        className='mr-1 group-hover:animate-bounce'
                      />
                      فيدو </span>
                  </div>
                </div>
              </div>
          )
        }) : [1, 2, 3, 4].map(item => {
          return (
            <div className=" w-[300px] h-[200px] m-2" key={item}><Skeleton className='w-full h-full' /></div>
          )
        })}
        
      </div>
      <Link className='p-2 px-3 mr-3 text-slate-50 bg-blue-400 hover:bg-blue-500 sticky bottom-3 right-3 rounded mt-4' href={`/`}>Back</Link>
    </div>
  )
}
