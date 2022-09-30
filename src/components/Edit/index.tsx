import { useState, useEffect, useRef, MouseEvent as MouseEventType } from "react"
import { useRouter } from "next/router"
import { Stage, Layer , Image } from 'react-konva';
import type { Stage as StageType } from "konva/lib/Stage";
import { Image as ImageType } from "konva/lib/shapes/Image";
import { Text as TextType } from "konva/lib/shapes/Text"
import { Line } from "konva/lib/shapes/Line";
import type { SelectShapeType } from "@/type/type";
import useImage from "@/hooks/useImage";
import useScreenWidth from '@/hooks/useScreenWidth'
import Header from '@/atoms/Header'
import CategoryButton from "@/atoms/CategoryButton";
import BaseImage from '@/components/Edit/BaseImage'
import TextEdit from '@/components/Edit/subCategory/TextEdit'
import DrawEdit from '@/components/Edit/subCategory/DrawEdit'
import Filter from '@/components/Edit/category/Filter'
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import { Layer as LayerType } from "konva/lib/Layer";

type Props = {
  cropImage: string
}

const Edit = ({ cropImage }: Props) => {
  const [category, setCategory] = useState<number | null>(null)
  const [refState, setRefState] = useState<StageType | null>(null)
  const [selectShape, setSelectShape] = useState<SelectShapeType>(null)
  const image = useImage(cropImage)
  const size = useScreenWidth(refState)
  const router = useRouter()
  const ref = useRef<LayerType | null>(null)

  console.log(Konva)
  

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
    setCategory(
      (e.target instanceof TextType) ? 0 :
      (e.target instanceof Image) ? 1 :
      (e.target instanceof Line) ? 2 : null
    )
    setSelectShape(e.target as ImageType | TextType | Line)
    console.log(selectShape)
  }

  const handleCategory = (e: MouseEventType<HTMLButtonElement>, index: number) => {
    setCategory(index)

    if(index === 1) {
      refState?.children && refState.children[0].children && setSelectShape(refState?.children[0]?.children[0] as ImageType)
    }
  }

  useEffect(() => {
    !cropImage && router.push({
      pathname: '/',
      query: null
    }, undefined, {
      shallow: true
    })
  }, [cropImage])

  // useEffect(() => {
  //   const newImage = new Konva.Image({
  //     image,
  //     width: (
  //       (window.innerWidth < 528) ? (window.innerWidth - 32) :
  //         (window.innerWidth < 768) ? 496 :
  //           (window.innerWidth < 1056) ? (((window.innerWidth - 32) - 48) - 376) : 600
  //     ),
  //     height: (
  //       (window.innerWidth < 528) ? ((window.innerWidth - 32) * 0.563) :
  //         (window.innerWidth < 768) ? 279.248 :
  //           (window.innerWidth < 1056) ? ((((window.innerWidth - 32) - 48) - 376) * 0.563) : 337.8
  //     )
  //   }) 

  //   refState?.children && refState?.children[0] && refState?.children[0].add(newImage)
  // }, [refState])

  useEffect(() => {
    if(!image || (Konva.stages.length > 0)) return

    const konvaStage = new Konva.Stage({
      container: 'container',
      width: size.width,
      height: size.height
    })

    const konvaLayer = new Konva.Layer()

    const konvaImage = new Konva.Image({
      image,
      width: size.width,
      height: size.height
    })

    konvaLayer.add(konvaImage)
    konvaStage.add(konvaLayer)
    konvaLayer.draw()

    konvaStage.on('mousedown touchstart', (e) => {
      setCategory(
        (e.target instanceof TextType) ? 0 :
        (e.target instanceof ImageType) ? 1 :
        (e.target instanceof Line) ? 2 : null
      )
    })

    return () => {
      konvaStage.destroy()
      // konvaImage.remove()
    }
  }, [image])
  
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

      {/* <div id='konva' /> */}

      {/* <Stage
        className="
          mb-2
          md:my-auto
          shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]
        "
        width={ size.width }
        height={ size.height }
        ref={ setRefState }
        onClick={ handleSelect }
        onTouchStart={ handleSelect }
        onDragEnd={ handleSelect }
      >
        <Layer> */}
          {/* <BaseImage cropImage={ cropImage } /> */}
        {/* </Layer>
      </Stage> */}

      <div id='container' />

      <div
        className="
          w-full
          md:w-[376px]
          flex
          flex-col
          border
          border-ogp-border
          border-solid
          rounded-2xl
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
            border-b
            border-ogp-border
            border-solid
            rounded-t-2xl
          "
        >
          {
            category_list.map((item, index) => (
              <CategoryButton
                key={ item.name }
                name={ item.name }
                icon={ item.icon }
                handle={ handleCategory }
                select={ category === index }
                index={ index }
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
            <Filter selectShape={ selectShape } /> :
            <DrawEdit selectShape={ selectShape } />
          )
        }
      </div>
    </div>
  )
}

export default Edit