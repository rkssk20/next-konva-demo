import { useEffect, useState } from "react"
import Konva from "konva"
import { Text } from "konva/lib/shapes/Text"

const Format = ({ selectKey }: { selectKey: string }) => {
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue(Konva.shapes[selectKey].attrs.align)
  }, [selectKey])

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
            onClick={ () => {
                    // @ts-ignore
              Konva.shapes[selectKey].align(item)
              setValue(item)
            }}
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