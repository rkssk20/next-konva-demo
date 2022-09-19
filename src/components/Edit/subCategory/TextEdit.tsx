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
  const [tabNumber, setTabNumber] = useState(0)

  console.log(selectShape);
  

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

  return (
    <div>
      <div
        className='
          w-full
          flex
          overflow-scroll
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
            rounded-2xl
          '
          onClick={ () => handleAddText({ refState, setSelectShape }) }
        >
          <span className="pb-2 text-2xl material-symbols-rounded">&#xe145;</span>
          追加
        </button>
        
        {
          subcategory_list.map((item, index) => (
            <SubCategoryButton
              key={ item.name }
              name={ item.name }
              icon={ item.icon }
              disabled={ selectShape instanceof Text }
              handle={ () => setTabNumber(index) }
            />
          ))
        }
      </div>
      {/* <Tabs
        tab_list={ tab_list }
        tabNumber={ tabNumber }
        setTabNumber={ setTabNumber }
      /> */}

      {
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