import { useEffect, useState } from "react"
import type { Text } from "konva/lib/shapes/Text"

const Align = ({ selectShapes }: { selectShapes: Text | null }) => {
  const [value, setValue] = useState(selectShapes?.attrs.align)

  useEffect(() => {
    setValue(selectShapes?.attrs.align)
  }, [selectShapes])

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
                selectShapes?.align(item)
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

export default Align