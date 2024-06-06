import Avideo  from "../../_components/Aviedo";
import { GetAllAutherData, getComments } from "@/app/api/server";
import Comment from "../../_components/Comment";
import {  headers } from "next/headers";
import { Suspense } from "react";
import SkeltonForAll from "@/app/(router)/_components/Skeltons/SkeltonForAll";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const authorId = params.slug.match(/\d+/g)
  const ids = authorId && parseInt(authorId[0], 10); 
  const name = params.slug.match(/[a-z]/g)?.join('')
  const nameId = name === 'camal' ? 0 : name === 'adnan' ? 1 : name === 'dosto' ? 3 : name === 'dostoi'? 4 : 2;
  const data = await GetAllAutherData()
  const title = data![nameId].categories[ids!].videoname;
  return {
    title: title
  }
}

function String(str: string): number | null {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await GetAllAutherData()
  if (!data) {
    return <div>Error: Unable to fetch author data.</div>;
  }
  const authorData = data[0];
  if (!authorData || !authorData.categories || !authorData.categories[2]) {
    return <div>Error: Author data or category not found.</div>;
  }

  const headersList = headers();
  const pathname = headersList.get('x-url' || 'Hussein')
  const id = String(params.slug);
  if(pathname === null) return 'error'
  const ID = String(pathname);

  if(id == null) return 'error'
  if(ID == null) return 'error'

  const author = data![ID]
  const categoryId = author.categories[id].id;
  const comments = await getComments(categoryId)

  
  return (
    <div className='my-4 px-4 container mx-auto lg:w-[900px] rounded-md'>
      <Avideo ids={author} category={data![ID].categories[id]} />
      <Suspense fallback={<div className="flex gap-x-3">
        <SkeltonForAll width="100%" height="60px" mdWidth="100%" mdHeight="60px" margain="1px" />
        <SkeltonForAll width="50px" height="60px" mdWidth="50px" mdHeight="60px" margain="1px" />
        </div>}>
      <Comment categoryId={data![ID].categories[id].id} comments={comments?.comments ?? []} />
      </Suspense>
    </div>
  );
}