import { useState, useEffect } from "react"
import type { SelectShapeType } from "@/type/type"

const Color = ({ selectShape }: { selectShape: SelectShapeType }) => {
  const [value, setValue] = useState(selectShape?.attrs.fill)
  
  useEffect(() => {
    setValue(selectShape?.attrs.fill)
  }, [selectShape])

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
            selectShape?.fill(e.target.value)
            setValue(e.target.value)
          }
        }
      />
    </div>
  )
}

export default Color