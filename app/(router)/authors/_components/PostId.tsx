'use client'

import { usePathname } from "next/navigation";

function String(str: string): number | null {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}


export function PostId(ids: string) {
  const pathname = usePathname()
  const authorId= String(pathname);

  const parsedAuthorId = authorId !== null ? authorId : -1;
  const slugId = String(ids)
  const id = slugId !== null ? slugId : -1;
  return {id, parsedAuthorId}
}
export function Post() {
  const pathname = usePathname()
  const authorId= String(pathname);

  const parsedAuthorId = authorId !== null ? authorId : -1;
  return parsedAuthorId
}
