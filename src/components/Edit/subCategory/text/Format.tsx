import { useEffect, useState } from "react"
import { Text } from "konva/lib/shapes/Text"
import type { SelectShapeType } from "@/type/type"

const Format = ({ selectShape }: { selectShape: SelectShapeType }) => {
  const [value, setValue] = useState(selectShape?.attrs.align)

  useEffect(() => {
    setValue(selectShape?.attrs.align)
  }, [selectShape])

  return (
    <div>
      {
        ['left', 'center', 'right'].map(item => (
          <button
            key={ item }
            className={
              (item === value) ?
              "bg-slate-600" : "bg-white"
            }
            onClick={
              () => {
                (selectShape instanceof Text) && selectShape?.align(item)
                setValue(item)
              }
            }
          >
            {
              (item === 'left') ? '左' :
              (item === 'center') ? '中央' : '右'
            }
          </button>
        ))
      }
    </div>
  )
}

export default Format