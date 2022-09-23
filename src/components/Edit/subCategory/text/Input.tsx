import { useState, useEffect } from 'react'
import { Text } from 'konva/lib/shapes/Text'
import type { SelectShapeType } from '@/type/type'

const Input = ({ selectShape }: { selectShape: SelectShapeType }) => {
  const [text, setText] = useState('')

  useEffect(() => {
    setText(selectShape?.attrs.text)
  }, [selectShape])

  return (
    <textarea
      className='
        mt-2
        mx-2
        p-2
        bg-gray-200
        rounded-xl
        resize-none
        line-break: anywhere
      '
      placeholder='テキストを入力'
      rows={ 3 }
      value={ text }
      onChange={ e => {
        (selectShape instanceof Text) && selectShape?.text(e.target.value)
        setText(e.target.value)
      }}
    />
  )
}

export default Input