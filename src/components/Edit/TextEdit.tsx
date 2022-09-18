import { useState } from 'react'
import type { Text } from "konva/lib/shapes/Text"
import Tabs from '@/atoms/Tabs'
import Input from '@/components/Edit/subCategory/text/Input'
import Color from '@/components/Edit/subCategory/text/Color'
import Align from '@/components/Edit/subCategory/text/Align'

type Props = {
  selectShapes: Text | null
}

const TextEdit = ({ selectShapes }: Props) => {
  const [tabNumber, setTabNumber] = useState(0)
  const tab_list = ['入力', '形', 'カラー', 'フォント', '配置']

  return (
    <div
      className="

      "
    >
      <Tabs
        tab_list={ tab_list }
        tabNumber={ tabNumber }
        setTabNumber={ setTabNumber }
      />

      {
        (tabNumber === 0) ?
        <Input selectShapes={ selectShapes } /> :
        (tabNumber === 2) ?
        <Color selectShapes={ selectShapes } /> :
        (tabNumber === 4) ?
        <Align selectShapes={ selectShapes } /> :
        <></>
      }
      
    </div>
  )
}

export default TextEdit