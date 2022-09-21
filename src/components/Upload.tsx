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
          h-[53px]
          p-2
          fixed
          top-0
          inset-x-0
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

      <div className='mt-4 p-4'>
        <label
          className="
            w-full
            p-8
            mx-auto
            flex
            flex-col
            items-center
            border
            border-ogp-border
            border-solid
            duration-200
            hover:bg-[#efefef]
            active:bg-[#e5e5e5]
            rounded-2xl
          "
        >
          <input
            className='m-auto'
            accept="image/*"
            type='file'
            hidden
            onChange={ handleUpload }
          />

          <span className='pb-4 text-4xl material-symbols-rounded'>
            &#xe43e;
          </span>

          <p className='text-xl'>
            画像をアップロード
          </p>
        </label>
      </div>
   </>
  )
}

export default Upload