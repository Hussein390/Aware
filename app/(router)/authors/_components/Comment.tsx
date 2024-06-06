'use client'
import { GetLikes, Likes, createComment, deleteComment, deleteLike, editComment } from '../../../api/server';
import { Button } from '@/components/ui/button';
import { Edit, ThumbsUp, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState} from 'react';
import { usePathname } from 'next/navigation';

interface Comment {
  id: string;
  message: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  parentId: string | null;
  userId: string | null;
  children?: Comment[];
}

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

const CommentComponent = ({ categoryId, comments }: { categoryId: string, comments: Comment[] }) => {
  const { data: session } = useSession();
  const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({});
  const [editedText, setEditedText] = useState<{ [key: string]: string }>({});
  const [isLike, setIsLike] = useState<{ [key: string]: boolean }>({});
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [text, setText] = useState('');
  const pathname = usePathname();

  const handleComment = async () => {
    if (categoryId) {
      const commentData = {
        name: session?.user?.name ?? 'Hussein Saleem',
        image: session?.user?.image ?? '/adnan/adnan-2.png',
        message: text,
        categoryId,
        pathname,
      };
      await createComment(commentData);
      setText('');
      // Optionally refetch comments or update state
    } else {
      console.error('Category ID is not valid');
    }
  };

  const handleEdit = (id: string) => {
    setIsEdit((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEditSubmit = async (id: string) => {
    await editComment(id, editedText[id], pathname);
    setEditedText({ ...editedText, [id]: '' });
    handleEdit(id);
  };

  const handleDelete = async (id: string) => {
    await deleteComment(id, pathname);
  };

  const toggleLike = async (commentId: string) => {
    const liked = isLike[commentId];
    if (liked) {
      const data = await GetLikes(commentId, pathname);
      if (data!) {
        const likeId = data.likes.find(like => like.commentId === like.commentId)?.id;
        if (likeId) {
          await deleteLike(likeId, pathname);
        }
      }
    } else {
      await Likes(commentId, pathname);
    }
    const updatedLikes = await GetLikes(commentId, pathname);
      setLikes(prev => ({ ...prev, [commentId]: updatedLikes!.likes.length }));
      setIsLike(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    
  };

  return (
    <div className='mt-20 pb-6'>
      <div className="flex gap-x-2">
        <input
          type="text"
          className="p-1 px-2 rounded flex-grow outline-none border border-slate-200 font-sans"
          value={text}
          placeholder='Write a comment'
          onChange={e => setText(e.target.value)}
        />
        <Button className='w-fit' onClick={handleComment}>Comment</Button>
      </div>
      <div className="mt-5 mx-1">
        {comments?.map(comment => (
          <div key={comment.id} className={`my-2 p-1 border-t-2 border-slate-900 dark:border-slate-200 rounded-tr-[35px]`}>
            <div className="flex justify-between mb-1 p-1 items-center">
              <div className="flex gap-x-3">
                <Image
                  src={comment.image ?? '/adnan/adnan-1.png'}
                  width={35}
                  height={35}
                  alt=''
                  className='rounded-full object-center'
                />
                <h4 className="font-semibold text-lg">{comment.name}</h4>
              </div>
              <div className="text-[13px] text-slate-300">{formatDate(comment.createdAt.toString().slice(0, 21))}</div>
            </div>
            <p className="font-sans p-1">{comment.message}</p>
            <div className="flex gap-x-3 mt-2 ml-auto w-fit">
              <div className="relative group flex items-start" onClick={() => toggleLike(comment.id)}>
                <ThumbsUp size={18} className='hover:text-blue-700 cursor-pointer overflow-hidden' style={{ color: isLike[comment.id] ? '#3b82f6' : 'white' }} />
                <span className="ml-1 dark:text-slate-200">{likes[comment.id]}</span>
                <span className='absolute text-[10px] group-hover:block hidden -top-7 -left-2 bg-slate-500 p-1 rounded text-slate-100'>Like</span>
              </div>
              <div className="relative group" onClick={() => handleEdit(comment.id)}>
                <Edit size={18} className='text-blue-500 hover:text-blue-700 cursor-pointer' />
                <span className='absolute text-[10px] group-hover:block hidden -top-7 -left-2 bg-slate-500 p-1 rounded text-slate-100'>Edit</span>
              </div>
              <div className="relative group" onClick={() => handleDelete(comment.id)}>
                <Trash size={18} className='text-red-500 hover:text-red-700 cursor-pointer' />
                <span className='absolute text-[10px] group-hover:block hidden -top-7 -left-2 bg-slate-500 p-1 rounded text-slate-100'>Delete</span>
              </div>
            </div>
            {isEdit[comment.id] && (
              <div className="flex flex-col sm:flex-row gap-x-2 w-[280px] md:w-[500px] mt-2 md:mt-0">
                <input
                  type="text"
                  className="p-1 rounded flex-grow outline-none border border-slate-200 font-sans"
                  defaultValue={comment.message}
                  onChange={e => setEditedText({ ...editedText, [comment.id]: e.target.value })}
                />
                <div className="flex gap-x-3 mt-2 sm:mt-0">
                  <Button className='w-fit text-xs font-bold' onClick={() => handleEditSubmit(comment.id)}>Edit</Button>
                  <Button className='w-fit text-xs font-bold' variant='destructive' onClick={() => handleEdit(comment.id)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;
