'use client'
import {useEffect, useState} from "react"
import Image from "next/image";
import { FeedbackType, GetAutherData, createFeedback, createFeedbackLikes, deleteFeedback, deleteLike, editFeedback, getFeedbackLikes } from "@/app/api/server";
import { ChevronDown, ChevronUp, DropletIcon, Edit, ThumbsUp, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { isatty } from "tty";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${year}/${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes}`;
}
export function Filter({ authors, feedbacks }: { authors: any[], feedbacks: FeedbackType[] }) {
  const [body, setBody] = useState('')
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [authorId, setauthorId] = useState(0)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [isFelter, setIsFelter] = useState(false)
  const [felterText, setFelterText] = useState("")
  const [warn, setWarn] = useState(false)
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [isLike, setIsLike] = useState<{ [key: string]: boolean }>({});
  const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({});
  const [editedText, setEditedText] = useState<{ [key: string]: string }>({});
  const [isActive, setIsActive] = useState(null);
  const [isActive2, setIsActive2] = useState(null);
  const pathname = usePathname();



  const { data: session } = useSession();
  
  const getFilteredData = async (name: string)=>{
      const data = await GetAutherData([name])
      return data
    }
    
 
  const CreateFeed = async () => {
    const feedback = {
        name: session?.user?.name ?? 'Hussein Saleem',
        image: session?.user?.image ?? '/adnan/adnan-2.png',
        body,
      id: authorId.toString(),
      categoryname: value,
        pathname,
    };
    await createFeedback(feedback)
    setBody('')
    setValue('')
    setauthorId(0)
  }
  function filteredFeedbacks(feedbackss: FeedbackType[]) {
    return (
  <>
    {feedbackss.length > 0 ? feedbackss.map(item => {
          return <div key={item.id} className="border border-slate-300 rounded-md p-2">
          <div className="flex items-center justify-between">
            <div className="flex gap-x-3 items-center">
              <Image
                  src={item.image ?? '/adnan/adnan-1.png'}
                  width={35}
                  height={35}
                  alt=''
                  className='rounded-full object-center'
              />
              <div className="text-gray-300 ">{ item.name}</div>
              </div>
              <div className="font-sans text-slate-200">{ item.categoryname}</div>
            </div>
            {isEdit[item.id] ? (
              <div className=" m-2 overflow-y-auto  pt-1 w-full">
                <input
                  type="text"
                  className="p-4 rounded w-full h-full  outline-slate-400 font-sans bg-transparent"
                  defaultValue={item.body}
                  onChange={e => setEditedText({ ...editedText, [item.id]: e.target.value })}
                />
                <div className="flex gap-x-3 mt-2 ">
                  <Button className='w-fit text-xs font-bold' onClick={() => handleEditSubmit(item.id)}>Edit</Button>
                  <Button className='w-fit text-xs font-bold' variant='destructive' onClick={() => handleEdit(item.id)}>Cancel</Button>
                </div>
              </div>
            ): <p className="pt-1 text-slate-300 font-sans m-2">{item.body}</p>}
          <div className="flex justify-between items-end mt-3">
            <p className="text-blue-400 text-xs sm:text-sm">{ formatDate(item.createdAt.toString())}</p>
            <div className="flex gap-x-3 ml-auto w-fit">
              <div className="relative group flex items-start" onClick={() => toggleLike(item.id)}>
                <ThumbsUp size={18} className='hover:text-blue-700 cursor-pointer overflow-hidden' style={{ color: isLike[item.id] ? '#3b82f6' : 'white' }} />
                <span className="ml-1 dark:text-slate-200">{likes[item.id]}</span>
                <span className='absolute text-[10px] group-hover:block hidden -top-7 -left-2 bg-slate-500 p-1 rounded text-slate-100'>Like</span>
              </div>
              <div className="relative group" onClick={() => handleEdit(item.id)}>
                <Edit size={18} className='text-blue-500 hover:text-blue-700 cursor-pointer' />
                <span className='absolute text-[10px] group-hover:block hidden -top-7 -left-2 bg-slate-500 p-1 rounded text-slate-100'>Edit</span>
              </div>
              <div className="relative group" onClick={() => handleDelete(item.id)}>
                <Trash size={18} className='text-red-500 hover:text-red-700 cursor-pointer' />
                <span className='absolute text-[10px] group-hover:block hidden -top-7 -left-2 bg-slate-500 p-1 rounded text-slate-100'>Delete</span>
              </div>
            </div>
          </div>
            
          </div>
    }) : <p className="text-lg font-sans text-black dark:text-amber-500 p-2">/لا توجد ردود افعال على  / {felterText} </p>}
  </>
  )
}
  const toggleLike = async (commentId: string) => {
    const liked = isLike[commentId];
    if (liked) {
      const data = await getFeedbackLikes(commentId, pathname);
      if (data!) {
        const likeId = data.like.find(like => like.commentId === like.commentId)?.id;
        if (likeId) {
          await deleteLike(likeId, pathname);
        }
      }
    } else {
      await createFeedbackLikes(commentId, pathname);
    }
    const updatedLikes = await getFeedbackLikes(commentId, pathname);
      setLikes(prev => ({ ...prev, [commentId]: updatedLikes!.like.length }));
      setIsLike(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    
  };

  const handleEdit = (id: string) => {
    setIsEdit((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handleEditSubmit = async (id: string) => {
    await editFeedback(id, editedText[id], pathname);
    setEditedText({ ...editedText, [id]: '' });
    handleEdit(id);
  };
    const handleDelete = async (id: string) => {
    await deleteFeedback(id, pathname);
  };
  return (
    <div className="w-[320px]  mx-auto md:ml-12  mt-8 mb-3">

      <div className="p-2  rounded bg-n2dark w-[280px] relative my-5 z-50"> 
        <div className="flex text-slate-200 w-full justify-between items-center cursor-pointer mb-1" onClick={() => setIsFelter(prev => !prev)}>
          <h1 className=" font-sans " > {felterText !== ''? felterText: 'فلترة الأراء'}</h1>
          {isFelter ? <ChevronDown className="animate-pulse "/> : <ChevronUp />}
        </div>
        <div className=" grid transition-all duration-200 overflow-hidden absolute top-12 left-0 w-full " style={{ gridTemplateRows: isFelter? '1fr': '0fr'}}>
          <div className={`min-h-0 mt-1 pt-1 ${isFelter ? 'block': 'hidden'} bg-n2dark border-slate-300 rounded  p-2`}>{authors?.map(item => { 
            return (
              <div key={item.id} onClick={() => {
                getFilteredData(item.name).then(item => item!.map(item => setFilteredData(item.feedBacks)))
                setFelterText(item.categoreyname)
                setIsActive(item.id)
                setIsFelter(prev => prev = false)
                
              }} className="hover:text-white my-1 p-1 rounded-md text-right cursor-pointer bg-dark font-sans" style={{color: isActive === item.id ? 'white': '#777'}}>{ item.categoreyname}</div>
            )
          })}
            <div className="py-1 mt-1 border-t-2 border-slate-300"></div>
          <div  onClick={() => {
                setFelterText('')
                setIsFelter(prev => prev = false)
              }} className="hover:animate-pulse mt-1 p-1  rounded-md text-right cursor-pointer bg-dark text-slate-300 font-sans">عشوائي</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-3">
        {felterText !== ''? filteredFeedbacks(filteredData) :filteredFeedbacks(feedbacks)}
      </div>
      <span className="w-full block h-1 my-5 bg-slate-300" ></span>
      <div className="text-right my-5 font-sans ">
        <h1 className="text-2xl text-black dark:text-white font-bold">النقد</h1>
        <p className="my-2 text-black dark:text-slate-300 leading-8">يجب أن يكون نقدك لأي سلسله لتبيان نقاط قوة أو ضعف السلسله أو نقد فكره تبناها المفكر</p>
        <div className="flex flex-col gap-y-3 w-fit ml-auto mt-4 text-black dark:text-slate-300">
          <div className="relative">
            <span className=" before:content-[''] before:absolute before:size-3  before:bg-white pr-5
        before:rounded-full before:top-2 before:right-0">
عدم التجاوز على المفكر نفسه</span>
          </div>
          
          <div className="relative">
        <span className=" before:content-[''] before:absolute before:size-3  before:bg-white pr-5
        before:rounded-full before:top-2 before:right-0">
عدم الخروج عن الموضوع</span>
          </div>
          
          <div className="relative">
        <span className="text-blue-600 dark:text-green-400 before:content-[''] before:absolute before:size-3  before:bg-white pr-5
        before:rounded-full before:top-2 before:right-0">
وما عدا ذلك، لك كل الحريه</span>
          </div>
          
        </div>
      </div>

      <div className="p-2 rounded bg-n2dark w-[280px] relative mt-5"> 
        <div className="flex w-full justify-between items-center cursor-pointer mb-1 text-slate-200 font-sans" onClick={() => setOpen(prev => !prev)}>
          <h1 className=" font-bold" > {value !== ''? value: 'أختر سلسله'}</h1>
          {open ? <ChevronDown className="animate-pulse"/> : <ChevronUp />}
        </div>
        <div className=" grid transition-all duration-200 overflow-hidden absolute top-12 left-0 w-full " style={{ gridTemplateRows: open? '1fr': '0fr'}}>
          <div className={`min-h-0 mt-1 pt-1 ${open ? 'block': 'hidden'} bg-n2dark border-slate-300 rounded  p-2`}>{authors?.map(item => { 
            return (
              <div key={item.id} onClick={() => {
                setauthorId(item.id)
                setValue(item.categoreyname)
                setIsActive2(item.id)
                setOpen(prev => prev = false)
              }} className=" my-1 p-1 rounded-md text-right cursor-pointer bg-dark font-sans" style={{color: isActive2 === item.id ? 'white': '#777'}}>{ item.categoreyname}</div>
            )
          })}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full h-[180px] md:w-[600px] md:h-[320px] rounded-md border border-slate-400 font-sans">
          <textarea placeholder="رئيك. . ." style={{direction: 'rtl'}} className="font-semibold placeholder:text-black text-black bg-slate-200 p-2 text-lg w-full h-full rounded-md outline-none resize-none" value={body} onChange={e => setBody(e.target.value)}/>
        </div>
        <div className="flex gap-x-6">
          <Button onClick={() => { 
            if (authorId === 0) {
              setWarn(true)
              setTimeout(() => {
                setWarn(false)
              }, 4000)
            } else {
              CreateFeed()
            }
          } } className="bg-blue-500 text-white hover:bg-blue-400 mt-2">Create</Button>
          {warn && <span className="text-red-500 p-2 border-slate-300 underline  underline-offset-4 text-lg font-sans">أختر سلسله</span>}
        </div>
      </div>
    </div>
  )
}

