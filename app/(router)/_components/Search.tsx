'use client'

import React, { useState, useEffect} from 'react'
import { Search } from 'lucide-react'
import { AuthorData, GetAllCategories } from '@/app/api/server'
import Image from 'next/image'
import Link from 'next/link'

export default function SearchInput() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<AuthorData[]>([])
  const regex = /^\d+:/;

  useEffect(() => {
    const fetchCategories = async () => {
      if (search.trim()) {
        const data: any = await GetAllCategories(search)
        if (search !== '') {
          setResults(data)
        }
      } else {
        setResults([]) 
      }
    }

    fetchCategories()
  }, [search])

  return (
    <div className="p-2 relative ml-5 sm:ml-1 border items-center border-slate-500 :border-slate-200 rounded-md flex">
      <Search className="dark:text-white text-blue-500" />
      <input
        placeholder="   Search"
        type="text"
        className="w-[100px] sm:w-full ml-1 outline-none dark:text-white font-semibold bg-transparent"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
        {search !== '' &&   
      <div>
        <div className="overflow-y-auto max-h-[400px] absolute top-14 z-50 left-0 bg-purple p-2 rounded">
        {results?.map(item => item.categories.map((item, index) => (
          <Link key={index} href={`/authors/${item.geturl}/${item.meid}`} onClick={() => {
            setSearch('')
          }} className="rounded w-[280px] h-[80px] my-1 border border-slate-500 bg-n2dark  cursor-pointer flex justify-between  gap-x-1" >
            <div className="w-[120px] relative">
            <Image
              src={item.img }
              alt=''
              fill
              className='rounded-t-xl object-cover'
            />
            </div>
            <div className="text-right p-1">  
            <h1 className=" text-slate-200 text-right text-xs font-sans mt-1">{item.videoname}</h1>
              <div className="flex justify-between mt-3 text-xs gap-x-2">
                <span className="font-sans  text-[#7baab7] ">{regex.test(item.minunts)? `${item.minunts}  ساعه`: `${item.minunts}  دقيقه`}</span>
                <span className="font-sans text-slate-300 ">{item.name}</span>

            </div>
              </div>
          </Link>
        )))}
      </div>
      </div>
}
    </div>
  )
}
