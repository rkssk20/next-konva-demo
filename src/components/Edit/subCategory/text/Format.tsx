import { useState, useEffect } from "react"
import Konva from "konva"
import Style from '@/components/Edit/subCategory/text/format/Style'
import Align from '@/components/Edit/subCategory/text/format/Align'
import FontSize from '@/components/Edit/subCategory/text/format/FontSize'

const Format = ({ selectKey }: { selectKey: string }) => {
  const [style, setStyle] = useState<string[]>([])
  const [align, setAlign] = useState<string>('')
  const [fontSize, setFontSize] = useState<number | null>(null)

  useEffect(() => {
    setAlign(Konva.shapes[selectKey].attrs.align)
    setFontSize(Konva.shapes[selectKey].attrs.fontSize)
  }, [selectKey])

  return (
    <div className="px-6 overflow-y-scroll">
      <Style
        style={ style }
        setStyle={ setStyle }
        selectKey={ selectKey }
      />

      <Align
        align={ align }
        setAlign={ setAlign }
        selectKey={ selectKey }
      />

      {
        fontSize &&
        <FontSize
          fontSize={ fontSize }
          setFontSize={ setFontSize }
          selectKey={ selectKey }
        />
      }
    </div>
  )
}

export default Format