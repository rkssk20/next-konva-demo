import type { Dispatch, SetStateAction } from "react"
import Konva from "konva"
import type { Stage } from "konva/lib/Stage"
import type { Text } from "konva/lib/shapes/Text"
import type { Image } from "konva/lib/shapes/Image"
import type { Line } from "konva/lib/shapes/Line"
import CategoryButton from "@/atoms/CategoryButton"

type Props = {
  refState: Stage | null
  setSelectShapes: Dispatch<SetStateAction<Text | Image | Line | null>>
}

const Draw = ({ refState, setSelectShapes }: Props) => {
  const handleDraw = () => {
    if(!refState) return

    var pos = refState.getPointerPosition();

    if(!pos) return
    
    const line: Line = new Konva.Line({
      stroke: '#df4b26',
      strokeWidth: 5,
      globalCompositeOperation: 'source-over',
      lineCap: 'round',
      lineJoin: 'round',
      points: [pos.x, pos.y, pos.x, pos.y]
    })

    refState?.children && refState.children[0].add(line)
    setSelectShapes(line)
  }

  return (
    <CategoryButton
      name='手書き'
      icon='&#xe3ae;'
      handle={ handleDraw }
    />
  )
}

export default Draw