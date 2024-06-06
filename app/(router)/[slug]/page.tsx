import { people } from '../_components/News'
import Author from './_components/Author';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  function extractNumbersFromString(str: string): RegExpMatchArray | null {
    return str.match(/\d/);
  }
  const authorId: RegExpMatchArray | null = extractNumbersFromString(params.slug);
  const parsedAuthorId: number | null = authorId ? parseInt(authorId[0], 10) : null;
  const author = parsedAuthorId !== null ? people[parsedAuthorId - 1] : null;
  return {
    title: author?.name
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  
  return <Author path={params.slug}/>
}
