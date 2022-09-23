import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Stage, Layer } from 'react-konva';
import type { Stage as StageType } from "konva/lib/Stage";
import { Text as TextType } from "konva/lib/shapes/Text"
import { Line } from "konva/lib/shapes/Line";
import type { SelectShapeType } from "@/type/type";
import useScreenWidth from '@/hooks/useScreenWidth'
import Header from '@/atoms/Header'
import CategoryButton from "@/atoms/CategoryButton";
import BaseImage from '@/components/Edit/BaseImage'
import TextEdit from '@/components/Edit/subCategory/TextEdit'
import DrawEdit from '@/components/Edit/subCategory/DrawEdit'
import { KonvaEventObject } from "konva/lib/Node";

type Props = {
  cropImage: string
}

const Edit = ({ cropImage }: Props) => {
  const [category, setCategory] = useState<number | null>(null)
  const [refState, setRefState] = useState<StageType | null>(null)
  const [selectShape, setSelectShape] = useState<SelectShapeType>(null)
  const size = useScreenWidth(refState)
  const router = useRouter()

  const category_list = [{
    name: 'テキスト',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe264;</span>
  }, {
    name: 'フィルター',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe43b;</span>
  }, {
    name: '手書き',
    icon:  <span className="pb-2 text-2xl material-symbols-rounded">&#xe3ae;</span>
  }]

  const handleNext = () => {
    router.push({
      pathname: '/',
      query: { step: 'result' }
    }, undefined, {
      shallow: true
    })
  }

  const handleSelect = (e: KonvaEventObject<MouseEvent | TouchEvent | DragEvent>) => {
    setCategory(e.target instanceof TextType ? 0 : e.target instanceof Line ? 2 : null)
    setSelectShape(e.target as TextType | Line)
  }

  useEffect(() => {
    !cropImage && router.push({ pathname: '/', query: null }, undefined, { shallow: true })
  }, [cropImage])
  
  return (
    <div
      className="
        w-full
        xs:w-[528px]
        md:w-[calc(100%-32px)]
        max-w-5xl
        h-[calc(100vh-85px)]
        mt-[69px]
        mx-auto
        p-4
        md:flex
        md:justify-between
        bg-white
        rounded-2xl
        overflow-hidden
      "
    >
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
          h-min
          mb-2
          md:my-auto
        "
        width={ size.width }
        height={ size.height }
        ref={ setRefState }
        onClick={ handleSelect }
        onTouchStart={ handleSelect }
        onDragEnd={ handleSelect }
      >
        <Layer>
          <BaseImage cropImage={ cropImage } />
        </Layer>
      </Stage>

      <div
        className="
          w-full
          md:w-[376px]
          flex
          flex-col
        "
        style={{
          height: (window.innerWidth < 768) ? `calc(100% - ${ size.height }px)` : '100%'
        }}
      >
        <div
          className="
            w-full
            flex
            overflow-x-scroll
          "
        >
          {
            category_list.map((item, index) => (
              <CategoryButton
                key={ item.name }
                name={ item.name }
                icon={ item.icon }
                handle={ () => setCategory(index) }
              />
            ))
          }
        </div>

        {
          (category !== null) && (
            (category === 0) ?
            <TextEdit
              refState={ refState }
              selectShape={ selectShape }
              setSelectShape={ setSelectShape }
            /> :
            (category === 1) ?
            <></> :
            <DrawEdit selectShape={ selectShape } />
          )
        }
      </div>
    </div>
  )
}

export default Edit