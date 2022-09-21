import { ChangeEvent, useEffect, useState } from "react"
import type { SelectShapeType } from "@/type/type"
import Font from "@/atoms/Font"

const Fonts = ({ selectShape }: { selectShape: SelectShapeType }) => {
  const [value, setValue] = useState('')

  const fonts = [
    'BIZ UDGothic',
    'BIZ UDMincho',
    'BIZ UDPGothic',
    'BIZ UDPMincho',
    'Dela Gothic One',
    'DotGothic16',
    'Hachi Maru Pop',
    'Hina Mincho',
    'Kaisei Decol',
    'Kaisei HarunoUmi',
    'Noto Sans JP',

  ]

  const handleFonts = (e: ChangeEvent<HTMLSelectElement>) => {
    if(!selectShape) return

    setValue(e.target.value)
    // @ts-ignore
    selectShape?.fontFamily(`"${ e.target.value}"`)
  }

  useEffect(() => {
    setValue(selectShape?.attrs.fontFamily)
  }, [selectShape])

  return (
    <div className=" overflow-scroll">
      {
        fonts.map(item => (
          <Font key={ item } fontFamily={ item } />
        ))
      }
    </div>
  )
}

export default Fonts