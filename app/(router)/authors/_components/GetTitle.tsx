
import { authorsData } from '@/app/(router)/_components/GlobalAPI';
import { PathId } from './Aviedo';

export default function GetTitle( ids: string) {
  const idd = parseInt(ids, 10);
  // const id = PathId()

  const title = authorsData[1].categories[idd].videoName;
  return title
}
