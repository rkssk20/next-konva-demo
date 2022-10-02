import { Dispatch, SetStateAction, useState } from 'react'
import type { Stage } from 'konva/lib/Stage'
import { Text } from 'konva/lib/shapes/Text'
import type { SetSelectShapeType } from '@/type/type'
import SubCategoryButton from '@/atoms/SubCategoryButton'
import Input from '@/components/Edit/subCategory/text/Input'
import Format from '@/components/Edit/subCategory/text/Format'
import Color from '@/components/Edit/subCategory/text/Color'
import Align from '@/components/Edit/subCategory/text/Fonts'
import Konva from 'konva'

type Props = {
  selectKey: string
  setSelectKey: Dispatch<SetStateAction<string>>
}

const TextEdit = ({ selectKey, setSelectKey }: Props) => {
  const [tabNumber, setTabNumber] = useState<number>(0)

  const subcategory_list = [{
    name: '入力',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe312;</span>
  }, {
    name: 'フォーマット',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe23c;</span>
  }, {
    name: 'カラー',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe40a;</span>
  }, {
    name: 'フォント',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe167;</span>
  }]

  const handleAdd = () => {
    const text: Text = new Konva.Text({
      x: 20,
      y: 60,
      text: 'テキストを入力',
      fontSize: 25,
      fontFamily: 'Noto Sans JP',
      lineHeight: 1.5,
      fill: '#ffffff',
      align: 'center',
      verticalAlign: 'middle',
      draggable: true, 
    }).on('dragend', () => {
      const width = (window.innerWidth < 640) ? (window.innerWidth - 32) : 608
      const height = (window.innerWidth < 640) ? (((window.innerWidth - 32) / 16) * 9) : 342
  
      text.absolutePosition({
        x: ((text.attrs.x - text.textWidth) < (-text.textWidth * 2)) ? 5 : (text.attrs.x > (width - 10)) ? (width - 50) : text.attrs.x,
        y: ((text.attrs.y - text.textHeight) < (-text.textHeight * 2)) ? 5 : (text.attrs.y > (height - 10)) ? (height - 50) : text.attrs.y
      })
    })
  
    text.absolutePosition({
      x: (window.innerWidth < 640) ? (((window.innerWidth - 32) / 2) - (text.textWidth / 2)) : (304 - (text.textWidth / 2)),
      y: (window.innerWidth < 640) ? (((((window.innerWidth - 32) / 16) * 9) / 2) - (text.textHeight / 2)): (171 - (text.textHeight / 2))
    })

    setTabNumber(0)
    Konva.stages[0].children && Konva.stages[0].children[0].add(text)
    setSelectKey(text.colorKey)
  }

  return (
    <>
      <div
        className='
          flex
          mb-2
          border-b
          border-ogp-border
          border-solid
        '
      >
        <button
          className='
            min-w-[90px]
            p-2
            flex
            flex-col
            items-center
            justify-center
            text-xs
            duration-200
            border-b-4
            border-transparent
            hover:bg-[#efefef]
            active:bg-[#e5e5e5]
          '
          onClick={ handleAdd }
        >
          <span className="pb-2 text-2xl material-symbols-rounded">&#xe145;</span>
          追加
        </button>

        <div className='border-r border-gray-300' />

        <div
          className='
            w-full
            flex
            overflow-x-scroll
          '
        >
          {
            subcategory_list.map((item, index) => (
              <SubCategoryButton
                key={ item.name }
                name={ item.name }
                icon={ item.icon }
                disabled={ !(Konva.shapes[selectKey] instanceof Text) }
                handle={ () => setTabNumber(index) }
                select={ (tabNumber === index) }
              />
            ))
          }
        </div>
      </div>

      {
        (Konva.shapes[selectKey] instanceof Text)  &&
        (tabNumber === 0) ?
        <Input selectKey={ selectKey } /> :
        (tabNumber === 1) ?
        <Format selectKey={ selectKey } /> :
        (tabNumber === 2) ?
        <Color selectKey={ selectKey } /> :
        (tabNumber === 3) &&
        <Align selectKey={ selectKey } />
      }
    </>
  )
}

export default TextEdit