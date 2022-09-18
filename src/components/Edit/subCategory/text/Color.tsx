import { useState, useEffect } from "react"
import { Text } from "konva/lib/shapes/Text"

const Color = ({ selectShapes }: { selectShapes: Text | null }) => {
  const [value, setValue] = useState(selectShapes?.attrs.fill)
  
  useEffect(() => {
    setValue(selectShapes?.attrs.fill)
  }, [selectShapes])

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
        onChange={
          e => {
            selectShapes?.fill(e.target.value)
            setValue(e.target.value)
          }
        }
      />
    </div>
  )
}

export default Color