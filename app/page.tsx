import News from "./(router)/_components/News";
import Course from "./(router)/_components/Course";
import {ComboboxDemo} from "./(router)/_components/Combobox";
import type { Metadata } from 'next'
import Podcats from "./(router)/_components/Novles/Podcats";
import { GetAutherData } from "./api/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: 'الكتاب و المفكرون',
}

export default async function Home() {
  const data = await GetAutherData(['عدنان ابراهيم', 'كمال الحيدري', 'عبدالوهاب المسيري', 'دوستويفسكي'])
  
  return (
    <div className="p-2 ">
      <News />
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="dark:bg-n2dark bg-white px-4 col-span-2 rounded-md grid grid-cols-2 md:grid-cols-3 mt-4 mx-2">
          <div className=" flex justify-between items-center col-span-3">
            <ComboboxDemo />
            <h1 className="text-2xl border-b-4 border-slate-400 font-semibold block dark:text-slate-100">السلاسل</h1>
          </div>
          
        <Course  data={data!}/>
      
      </div>
        <div className="mx-2 mt-2">
          <Podcats />
        </div>
      </div>
    </div>
  );
}
