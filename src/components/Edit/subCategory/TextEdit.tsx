import { Dispatch, SetStateAction, useState } from 'react'
import Konva from 'konva'
import { Text } from 'konva/lib/shapes/Text'
import useScreenWidth from '@/hooks/useScreenWidth'
import SubCategoryButton from '@/atoms/SubCategoryButton'
import Input from '@/components/Edit/subCategory/text/Input'
import Format from '@/components/Edit/subCategory/text/Format'
import Color from '@/components/Edit/subCategory/text/Color'
import Align from '@/components/Edit/subCategory/text/Fonts'

type Props = {
  selectKey: string
  setSelectKey: Dispatch<SetStateAction<string>>
}

const TextEdit = ({ selectKey, setSelectKey }: Props) => {
  const [tabNumber, setTabNumber] = useState<number>(0)
  const defaultWidth = useScreenWidth()
  
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
    const parent = document.querySelector('#stage-parent')

    if(!parent || !defaultWidth) return

    const text: Text = new Konva.Text({
      x:  (defaultWidth / 2) - 87.5,
      y:  ((defaultWidth * 0.5625) / 2) - 12.5,
      text: 'テキストを入力',
      fontSize: 25,
      fontFamily: 'Noto Sans JP',
      lineHeight: 1.5,
      fill: '#ffffff',
      align: 'left',
      verticalAlign: 'middle',
      draggable: true, 
    }).on('dragend', () => {
      text.absolutePosition({
        x: ((text.attrs.x - text.textWidth) < (-text.textWidth * 2)) ? 5 : (text.attrs.x > (parent.clientWidth - 10)) ? (parent.clientWidth - 50) : text.attrs.x,
        y: ((text.attrs.y - text.textHeight) < (-text.textHeight * 2)) ? 5 : (text.attrs.y > (parent.clientHeight - 10)) ? (parent.clientHeight - 50) : text.attrs.y
      })
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