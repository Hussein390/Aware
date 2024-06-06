'use client'
import { Button } from '@/components/ui/button'
import { LogIn, Menu, Search} from 'lucide-react'
import React from 'react'
import { useMyContext } from './ContextProvider'
import { ThemeButton } from './ThemeButton'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import SearchInput from './Search'


export default function Header() {
  const { HandleOpen, isOpen } = useMyContext()
  const {status, data: session} = useSession()
  return (
    <header 
      className='p-2  px-4  bg-white dark:bg-black dark:bg-opacity-25 flex justify-between items-center'>
      <div className=" flex items-center md:gap-x-3">
      <div onClick={() => {
        HandleOpen()
      }
      } style={{display: isOpen? 'none': 'block'}} className="block sm:hidden">
        <Menu className='hover:text-slate-600 cursor-pointer duration-200'/>
        </div>
        <SearchInput />
      </div>
      <div className="flex gap-x-2 items-center  ">
        <ThemeButton />
        {status === 'authenticated' ?
          <Link href={`/profile`} className="">
            <Image 
              src={`${session.user?.image}`} width={40} height={40} className='rounded-full cursor-pointer' alt='' />
          </Link>
          :
          <Button onClick={()=> signIn('google')}>Login <LogIn className='ml-1' size={16}/></Button>
          
      }
      </div>
    </header>
  )
}
