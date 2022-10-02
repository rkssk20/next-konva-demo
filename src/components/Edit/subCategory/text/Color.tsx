import { useState, useEffect } from "react"
import Konva from "konva"

const Color = ({ selectKey }: { selectKey: string }) => {
  const [value, setValue] = useState('')
  
  useEffect(() => {
    setValue(Konva.shapes[selectKey].attrs.fill)
  }, [selectKey])

  return (
    <div className="flex">
      <input
        type='color'
        className="
          my-8
          mx-auto
          w-28
          h-28
          rounded-2xl
        "
        value={ value }
        onChange={ e => {
          Konva.shapes[selectKey].fill(e.target.value)
          setValue(e.target.value)
        }}
      />
    </div>
  )
}

export default Color