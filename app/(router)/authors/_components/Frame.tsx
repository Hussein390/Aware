
export default function IFrame({src}: {src: string}) {
  return (
      <iframe
      src={src}
      allowFullScreen
      className='w-full h-full rounded-xl'
      title="Hussein Saleem"
    />
  )
}
