import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { Stage, Layer } from 'react-konva';
import type { Stage as StageType } from "konva/lib/Stage";
import useScreenWidth from '@/hooks/useScreenWidth'
import Header from '@/atoms/Header'
import BaseImage from '@/components/konvaItems/BaseImage'
import TextArea from '@/components/konvaItems/TextArea'

type Props = {
  cropImage: string
}

const Edit = ({ cropImage }: Props) => {
  const [textArray, setTextArray] = useState<number[]>([])
  const ref = useRef<StageType | null>(null)
  const size = useScreenWidth(ref)
  const router = useRouter()
  

  const handleNext = () => {
    router.push({
      pathname: '/',
      query: { step: 'result' }
    }, undefined, {
      shallow: true
    })
  }
  
  useEffect(() => {
    !cropImage && router.push({ pathname: '/', query: null }, undefined, { shallow: true })
  }, [cropImage])

  return (
    <>
      <Header
        title='画像を編集'
        backIcon={
          <button
            onClick={ () => router.push({
              pathname: '/',
              query: { step: 'crop' }
            }, undefined, {
              shallow: true
            }) }
          >
            戻る
          </button>
        }
        forwardIcon={
          <button
            className="text-[#2cb696]"
            onClick={ handleNext }
          >
            次へ
          </button>
        }
      />
    
      <Stage
        className="
          mb-8
          border
          border-slate-400
          border-solid
        "
        width={ size.width }
        height={ size.height }
        ref={ ref }
      >
        <Layer>
          <BaseImage cropImage={ cropImage } />

          {
            textArray.map((e) =>
              <TextArea key={ e } />
            )
          }
        </Layer>
      </Stage>

      <button
        className="
          w-28
          h-28
          p-2
          bg-emerald-500
          text-white
          font-semibold
          rounded-2xl
        "
        onClick={ () =>
          setTextArray([...textArray, textArray.length + 1])
        }
        disabled={
          (textArray.length > 4) && true
        }
      >
        テキスト追加
      </button>


      <button
        className="
          w-28
          h-28
          p-2
          bg-emerald-500
          text-white
          font-semibold
          rounded-2xl
        "
        onClick={ () =>
          setTextArray([...textArray, textArray.length + 1])
        }
        disabled={
          (textArray.length > 4) && true
        }
      >
        フィルター
      </button>


      <button
        className="
          w-28
          h-28
          p-2
          bg-emerald-500
          text-white
          font-semibold
          rounded-2xl
        "
        onClick={ () =>
          setTextArray([...textArray, textArray.length + 1])
        }
        disabled={
          (textArray.length > 4) && true
        }
      >
        ステッカー
      </button>
    </>
  )
}

export default Edit