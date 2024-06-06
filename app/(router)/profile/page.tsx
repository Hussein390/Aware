import { GetAllAutherData } from '@/app/api/server';
import Profile from './_components/Profile';

export default async function page() {
  const data = await GetAllAutherData()
  return <Profile completedCourses={data!}/>
}

