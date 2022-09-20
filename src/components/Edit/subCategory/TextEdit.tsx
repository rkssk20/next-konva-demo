import { useState } from 'react'
import type { Stage } from 'konva/lib/Stage'
import { Text } from 'konva/lib/shapes/Text'
import type { SelectShapeType, SetSelectShapeType } from '@/type/type'
import handleAddText from '@/lib/handleAddText'
import SubCategoryButton from '@/atoms/SubCategoryButton'
import Input from '@/components/Edit/subCategory/text/Input'
import Color from '@/components/Edit/subCategory/text/Color'
import Align from '@/components/Edit/subCategory/text/Align'

type Props = {
  refState: Stage | null
  selectShape: SelectShapeType
  setSelectShape: SetSelectShapeType
}

const TextEdit = ({ refState, selectShape, setSelectShape }: Props) => {
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
    handleAddText({ refState, setSelectShape })

    setTabNumber(0)
  }

  return (
    <div>
      <div className='flex'>
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

        <div className='mx-2 border-r border-gray-300' />

        <div
          className='
            w-full
            flex
            overflow-scroll
          '
        >
          {
            subcategory_list.map((item, index) => (
              <SubCategoryButton
                key={ item.name }
                name={ item.name }
                icon={ item.icon }
                disabled={ !(selectShape instanceof Text) }
                handle={ () => setTabNumber(index) }
                select={ (tabNumber === index) }
              />
            ))
          }
        </div>
      </div>
      {/* <Tabs
        tab_list={ tab_list }
        tabNumber={ tabNumber }
        setTabNumber={ setTabNumber }
      /> */}

      {
        (selectShape instanceof Text) &&
        (tabNumber === 0) ?
        <Input selectShape={ selectShape } /> :
        (tabNumber === 1) ?
        <></> :
        (tabNumber === 2) ?
        <Color selectShape={ selectShape } /> :
        (tabNumber === 3) ?
        <Align selectShape={ selectShape } /> :
        <></>
      }
      
    </div>
  )
}

export default TextEdit