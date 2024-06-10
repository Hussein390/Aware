'use client'
import { User, BookOpen, ClipboardList, SquareX } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { useMyContext } from './ContextProvider';
import { useRouter } from 'next/navigation';

export default function SideBar() {
  const { setIsOpen } = useMyContext();
  const [isActive, setIsActive] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menu = [
    {
      id: 1,
      title: 'الرئيسية',
      icon: BookOpen,
      color: '#cddc39',
      direct: '/'
    },
    {
      id: 2,
      title: 'رئيك',
      icon: ClipboardList,
      color: '#ff9800',
      direct: '/feedback'
    },
    {
      id: 3,
      title: 'من أنا',
      icon: User,
      color: '#00e2ff',
      direct: '/about-me'
    }
  ]
  const route = useRouter();

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (windowWidth! < 900) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen, setWindowWidth, windowWidth]);

  return (
    <div ref={sidebarRef} className='w-full p-2'>
      <div className="flex justify-between cursor-pointer items-center">
        <h1 className='text-3xl font-bold text-blue-600 pb-1 border-b-4 border-blue-200 w-fit'>Aware</h1>
        <SquareX onClick={() => setIsOpen(prev => !prev)} size={30} className='hover:text-red-600 text2xl duration-150 block lg:hidden' />
      </div>
      <div className="mt-6 flex flex-col gap-y-3 p-2">
        {menu.map(item => {
          return (
            <div onClick={() => {
              setIsActive(item.id);
              route.push(item.direct!);
              windowWidth! < 900 && setIsOpen(prev => !prev)
            }} className={`p-3 group rounded-md text-white hover:bg-purple hover:duration-300 ${isActive === item.id  ? 'bg-purple' : 'bg-slate-400'} cursor-pointer flex gap-x-4`} key={item.id}>
              <item.icon style={{ color: item.color }} className='group-hover:animate-bounce' />
              <h3 className='font-sans text-xl text-nowrap' style={{ direction: 'rtl' }}>{item.title}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}
