import type { Dispatch, SetStateAction } from "react"
import Konva from "konva"
import type { Stage } from "konva/lib/Stage"
import type { Text } from "konva/lib/shapes/Text"
import type { Line } from "konva/lib/shapes/Line"


type Props = {
  refState: Stage | null
  setSelectShape: Dispatch<SetStateAction<Text | Line | null>>
}

const handleAddText = ({ refState, setSelectShape }: Props) => {
  if(!refState?.children || (refState.children && (refState.children?.length > 10))) return

  const text: Text = new Konva.Text({
    x: 20,
    y: 60,
    text: 'テキストを入力',
    fontSize: 25,
    fontFamily: 'Noto Sans JP',
    lineHeight: 1.5,
    fill: '#ffffff',
    align: 'center',
    verticalAlign: 'middle',
    draggable: true, 
  }).on('dragend', () => {    
    const width = (window.innerWidth < 640) ? (window.innerWidth - 32) : 608
    const height = (window.innerWidth < 640) ? (((window.innerWidth - 32) / 16) * 9) : 342

    text.absolutePosition({
      x: ((text.attrs.x - text.textWidth) < (-text.textWidth * 2)) ? 5 : (text.attrs.x > (width - 10)) ? (width - 50) : text.attrs.x,
      y: ((text.attrs.y - text.textHeight) < (-text.textHeight * 2)) ? 5 : (text.attrs.y > (height - 10)) ? (height - 50) : text.attrs.y
    })
  })

  text.absolutePosition({
    x: (window.innerWidth < 640) ? (((window.innerWidth - 32) / 2) - (text.textWidth / 2)) : (304 - (text.textWidth / 2)),
    y: (window.innerWidth < 640) ? (((((window.innerWidth - 32) / 16) * 9) / 2) - (text.textHeight / 2)): (171 - (text.textHeight / 2))
  })

  refState?.children[0].add(text)
  setSelectShape(text)
}

export default handleAddText