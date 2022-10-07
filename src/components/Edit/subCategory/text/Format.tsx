import { useState, useEffect } from "react"
import Konva from "konva"
import Align from '@/components/Edit/subCategory/text/format/Align'
import FontSize from '@/components/Edit/subCategory/text/format/FontSize'

const Format = ({ selectKey }: { selectKey: string }) => {
  const [align, setAlign] = useState<string>('')
  const [fontSize, setFontSize] = useState<number | null>(null)

  useEffect(() => {
    setAlign(Konva.shapes[selectKey].attrs.align)
    setFontSize(Konva.shapes[selectKey].attrs.fontSize)
  }, [selectKey])

  return (
    <div className="px-6 overflow-y-scroll">
      <Align
        align={ align }
        setAlign={ setAlign }
        selectKey={ selectKey }
        />

      <FontSize
        fontSize={ fontSize }
        setFontSize={ setFontSize }
        selectKey={ selectKey }
      />
    </div>
  )
}

export default Format