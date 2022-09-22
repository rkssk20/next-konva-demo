import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import Page from '@/atoms/Page'
import Header from '@/atoms/Header'

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
    <Page>
      <Header
        title='画像を選択'
        backIcon={
          <button>
            キャンセル
          </button>
        }
        forwardIcon={ undefined }
      />

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
   </Page>
  )
}

export default Upload