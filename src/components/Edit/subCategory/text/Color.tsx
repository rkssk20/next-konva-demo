import { useState, useEffect } from "react"
import Konva from "konva"
import { SketchPicker  } from 'react-color'

const Color = ({ selectKey }: { selectKey: string }) => {
  const [value, setValue] = useState('')
  
  useEffect(() => {
    setValue(Konva.shapes[selectKey].attrs.fill)
  }, [selectKey])

  return (
    <div className="flex overflow-y-scroll">
      <SketchPicker
        className="
          mx-auto
          !shadow-none
          [&_label]:!text-base
          [&_input]:!text-base
        "
        width="326px"
        disableAlpha
        presetColors={ [] }
        color={ value }
        onChange={ e => {
            Konva.shapes[selectKey].fill(e.hex)
            setValue(e.hex)
          }
        }
      />
    </div>
  )
}

export default Color