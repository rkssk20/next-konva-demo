import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const Upload = dynamic(() => import('@/components/Upload'))
const Crop = dynamic(() => import('@/components/Crop'))
const Edit = dynamic(() => import('@/components/Edit'), { ssr: false })

const Home: NextPage = () => {
  const [selectImage, setSelectImage] = useState('')
  const [cropImage, setCropImage] = useState('')
  const router = useRouter()

  return (
    // <div
    //   className='
    //     max-w-screen-sm
    //     h-[calc(100vh-85px)]
    //     mt-[69px]
    //     mx-auto
    //     p-4
    //     bg-white
    //     rounded-2xl
    //     overflow-scroll
    //   '
    // >
    //   {
        (router.query.step === 'crop') ?
        <Crop selectImage={ selectImage } setCropImage={ setCropImage } />
        :
        (router.query.step === 'edit') ?
        <Edit cropImage={ cropImage } />
        :
        <Upload setSelectImage={ setSelectImage } />
    //   }
    // </div>
  )
}

export default Home
