import ListOfVideos from "../_components/ListOfVideos";
import { GetAllAutherData } from "@/app/api/server";

export async function generateMetadata({ params }: { params: { name: string } }) {
  const data = await GetAllAutherData()
  if (data && data.length >= 0) {
    const authorId = params.name.match(/\d/)
    const ids = authorId && parseInt(authorId[0], 10);
    const title = data[ids!].categoreyname;
    return {
      title: title
    }
  }
}

export default async function Page({ params }: { params: { name: string } }) {
  const data = await GetAllAutherData()
  return <ListOfVideos path={params.name} data={data!} />
}
