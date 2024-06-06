import { GetAllAutherData } from '@/app/api/server'
import Dstoiviski from './Dstoiviski'

export default async function Podcats() {
  const data = await GetAllAutherData()
  
  return <Dstoiviski data={data!.slice(3, 5)}/> 
}
