import { ReactNode } from "react"

const Page = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className='
        max-w-screen-sm
        h-[calc(100vh-85px)]
        mt-[69px]
        mx-auto
        p-4
        bg-white
        rounded-2xl
      '
    >
      { children }
    </div>
  )
}

export default Page