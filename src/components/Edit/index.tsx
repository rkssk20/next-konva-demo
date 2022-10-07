import { useState, useEffect, MouseEvent as MouseEventType } from "react"
import { useRouter } from "next/router"
import Konva from "konva";
import { Image as ImageType } from "konva/lib/shapes/Image";
import { Text as TextType } from "konva/lib/shapes/Text"
import { Line } from "konva/lib/shapes/Line";
import useImage from "@/hooks/useImage";
import useScreenWidth from '@/hooks/useScreenWidth'
import Header from '@/atoms/Header'
import CategoryButton from "@/atoms/CategoryButton";
import TextEdit from '@/components/Edit/subCategory/TextEdit'
import DrawEdit from '@/components/Edit/subCategory/DrawEdit'
import Filter from '@/components/Edit/category/Filter'

type Props = {
  cropImage: string
}

const Edit = ({ cropImage }: Props) => {
  const [category, setCategory] = useState<number | null>(null)
  const [selectKey, setSelectKey] = useState('')
  const image = useImage(cropImage)
  const router = useRouter()
  const defaultWidth = useScreenWidth()
  
  const category_list = [{
    name: 'フィルター',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe43b;</span>
  }, {
    name: 'テキスト',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe264;</span>
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

  const handleCategory = (e: MouseEventType<HTMLButtonElement>, index: number) => {
    if(index === 0) {
      // @ts-ignore
      setSelectKey(Konva?.stages[0].children[0].children[0].colorKey)
    }

    setCategory(index)
  }

  useEffect(() => {
    !cropImage && router.push({
      pathname: '/',
      query: null
    }, undefined, {
      shallow: true
    })
  }, [cropImage])

  useEffect(() => {
    if(!image || (Konva.stages.length > 0) || !defaultWidth) return

    const parent = document.querySelector('#stage-parent')

    if(!parent) return

    const konvaStage = new Konva.Stage({
      container: 'container',
      width: defaultWidth,
      height: defaultWidth * 0.5625
    })

    const konvaLayer = new Konva.Layer()

    const konvaImage = new Konva.Image({
      image,
      width: parent.clientWidth,
      height: parent.clientHeight,
      filters: [
        Konva.Filters.Brighten,
        Konva.Filters.Contrast,
        Konva.Filters.HSV,
        Konva.Filters.Blur,
        Konva.Filters.Pixelate,
        Konva.Filters.Noise
      ]
    })
    .brightness(0)
    .contrast(0)
    .saturation(0)
    .blurRadius(0)
    .pixelSize(3)
    .noise(0)

    konvaImage.cache()
    konvaLayer.add(konvaImage)
    konvaStage.add(konvaLayer)
    konvaLayer.draw()
    setSelectKey(konvaImage.colorKey)
    setCategory(0)

    konvaStage.on('mousedown touchstart', (e) => {
      // @ts-ignore
      setSelectKey(e.target.colorKey)

      setCategory(
        (e.target instanceof ImageType) ? 0 :
        (e.target instanceof TextType) ? 1 :
        (e.target instanceof Line) ? 2 : null
      )
    })

    return () => {
      konvaStage.destroy()
      // konvaImage.remove()
    }
  }, [image, defaultWidth])
  
  return (
    <div
      className="
        w-full
        md:w-[528px]
        lg:w-[calc(100%-32px)]
        max-w-5xl
        h-[calc(100vh-85px)]
        mt-[69px]
        mx-auto
        p-4
        lg:flex
        lg:justify-between
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

      <div
        className="
          w-full
          md:w-[496px]
          lg:w-[calc((100%-16px)-376px)]
          xl:w-[600px]
          aspect-video
          mb-2
          lg:my-auto
          shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]
        "
        id='stage-parent'
      >
        <div id='container' />
      </div>

      <div
        className="
          w-full
          lg:w-[376px]
          flex
          flex-col
          border
          border-ogp-border
          border-solid
          rounded-2xl
        "
        style={{
          height: (window.innerWidth < 768) ? `calc(100% - ${ document.querySelector('#stage-parent')?.clientHeight }px)` : '100%'
        }}
      >
        <div
          className="
            w-full
            min-h-[85px]
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
            <Filter selectKey={ selectKey } /> :
            (category === 1) ?
            <TextEdit selectKey={ selectKey } setSelectKey={ setSelectKey } /> :
            <DrawEdit selectKey={ selectKey } />
          )
        }
      </div>
    </div>
  )
}

export default Edit