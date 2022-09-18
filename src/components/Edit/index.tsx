import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Stage, Layer } from 'react-konva';
import type { Stage as StageType } from "konva/lib/Stage";
import { Text as TextType } from "konva/lib/shapes/Text"
import useScreenWidth from '@/hooks/useScreenWidth'
import Header from '@/atoms/Header'
import BaseImage from '@/components/Edit/BaseImage'
import Text from '@/components/Edit/Text'
import TextEdit from '@/components/Edit/TextEdit'
import { Image } from "konva/lib/shapes/Image";

type Props = {
  cropImage: string
}

const Edit = ({ cropImage }: Props) => {
  const [refState, setRefState] = useState<StageType | null>(null)
  const [selectShapes, setSelectShapes] = useState<TextType | Image | null>(null)
  const size = useScreenWidth(refState)
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
        ref={ setRefState }
        onClick={ e => setSelectShapes(e.target as TextType | Image) }
        onTouchEnd={ e => setSelectShapes(e.target as TextType | Image) }
        onDragEnd={ e => setSelectShapes(e.target as TextType | Image) }
      >
        <Layer>
          <BaseImage cropImage={ cropImage } />
        </Layer>
      </Stage>

      {
        selectShapes instanceof TextType ?
        <TextEdit selectShapes={ selectShapes } /> :
        selectShapes instanceof Image ?
        <></> : <></>
      }

      <Text refState={ refState } setSelectShapes={ setSelectShapes } />
    </>
  )
}

export default Edit