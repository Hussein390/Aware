'use client'
import { people } from '@/app/(router)/_components/News'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'


export default function Page({ params }: { params: { name: string } }) {
  function extractNumbersFromString(str: string): RegExpMatchArray | null {
    return str.match(/\d+/);
}
  const pathname = usePathname()

  const authorId: RegExpMatchArray | null = extractNumbersFromString(pathname);
  const parsedAuthorId= authorId && parseInt(authorId[0], 10);
  const id = parseInt(params.name)
  const data = people[parsedAuthorId! - 1].youtube[id - 1]
  
  return (
    <div className='m-5 w-[350px] h-[190px] md:w-[600px] md:h-[420px] rounded-md'>
      {id - 1 === 0 ? data.one : id - 1 === 1 ? data.two : data.three}
      <Link className='p-1 px-2 text-slate-50 bg-blue-400 hover:bg-blue-500 rounded mt-4 bottom-4 float-end' href={`${pathname.slice(0, -2)}`}>Back</Link>

    </div>
  )
}
