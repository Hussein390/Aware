'use client'

import Image from "next/image"
import { useState } from "react"

export default function Page() {
  const [isArabic, setIsArabic] = useState(true)
  return (
    <div className=' mb-5 p-3 w-full lg:w-[700px] '>
        <div className={`${isArabic? 'font-sans': 'font-normal'}`} style={{ direction: isArabic? 'rtl' : 'ltr' }}>
      <div className="flex p-2 gap-x-3 rounded-md bg-purple w-fit">
        <span onClick={()=> setIsArabic(true)} className={`p-2 text-white cursor-pointer hover:bg-n2dark ${isArabic? 'bg-n2dark': ''}`}>{isArabic? 'العربيه': "Arabic" }</span>
        <span onClick={()=> setIsArabic(false)} className={`p-2 text-white cursor-pointer hover:bg-n2dark ${isArabic? '': 'bg-n2dark'}`}>{isArabic? 'النكليزيه': "English" }</span>
      </div>
        <h1 className="text-lg text-black dark:text-white mt-5 font-semibold">{isArabic ? "هدف الموقع" : "Website's Goal"}</h1>
        <p className="leading-8 text-black dark:text-white  mt-5">{isArabic
          ? 'الهدف من انشاء هذا الموقع لتوعية الجيل الحالي والمستقبلي لفهم ثقافتهم واحترامها والعمل على تعميق اسسوها وقيمها النبيله في ذواتهم.'
          :'The goal of creating this website is to educate the current and future generation to understand and respect their culture and work to deepen its foundations and noble values within themselves.'
          }
        </p>
        <p className="leading-8 text-black dark:text-white  mt-5">{isArabic
          ? 'وهذا الموقع هو بداية أسهامتي في نشر هذا الفكر ، وأن شاء الله سيكون هناك عمل حقيقي في السير في هذا الاتجاه.'
          : 'This website is the beginning of my contribution to spreading this thought, and God willing, there will be real work in moving in this direction.'}
        </p>
        <p className="leading-8 text-black dark:text-white  mt-5">{isArabic
          ? 'من الجيد أن تكون شخص مهتم في تثقيف نفسك في هذا الاتجاه. ومن الجيد جدا ان تشارك الفكر الذي يبني انسانية الإنسان مع عائلتك ، أهلك ، جيرانك أو المجتمع.  المهمه هي كيف تطيب الحياة ، كيف تبارك الحياة ، كيف تنير الطريق لنفسك ولغيرك من السالكين.'
          : 'It is good that you are someone interested in educating yourself in this direction.  It is very good to share the thought that builds human humanity with your family, relatives, neighbors or society.   The mission is how to make life good, how to bless life, how to illuminate the path for yourself and for others who walk.'}
          </p>
      </div>
      <div className="w-fit mx-auto mt-6 font-sans">
      <Image src={'/hussein.png'} width={300} height={240} className="rounded object-cover" alt="Hussein" />
      <p style={{ direction: isArabic ? 'rtl' : 'ltr' , fontSize: isArabic? '18px': '16px'}} className=' text-black dark:text-white mt-2 font-semibold'>{isArabic? 'تم انشاء هذا الموقع بواسطه حسين سليم': 'This website was created by Hussein Saleem' }</p>
      </div>
    </div>
  )
}
