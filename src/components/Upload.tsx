import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'

type Props = {
  setSelectImage: Dispatch<SetStateAction<string>>
}

const Upload = ({ setSelectImage }: Props) => {
  const router = useRouter()

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        if (reader.result) {
          setSelectImage(reader.result.toString() || "");

          router.push({
            pathname: '/',
            query: { step: 'crop' }
          }, undefined, {
            shallow: true
          })
        }
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <>
      <div
        className='
          p-2
          fixed
          top-0
          right-0
          left-0
          flex
          items-center
          bg-white
          z-10
        '
      >
        <p className='ml-auto mr-auto text-xl font-bold text-center'>
          画像を選択
        </p>
      </div>

      <input
        className='m-auto'
        accept="image/*"
        type='file'
        onChange={ handleUpload }
      />
    </>
  )
}

export default Upload