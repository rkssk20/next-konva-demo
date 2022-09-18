import { useState, useEffect } from 'react'
import type { Text } from "konva/lib/shapes/Text"

type Props = {
  selectShapes: Text | null
}

const Input = ({ selectShapes }: Props) => {
  const [text, setText] = useState('')

  useEffect(() => {
    setText(selectShapes?.attrs.text)
  }, [selectShapes])

  return (
    <textarea
      className='
        w-full
        mt-2
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
        selectShapes?.text(e.target.value)
        setText(e.target.value)
      }}
    />
  )
}

export default Input