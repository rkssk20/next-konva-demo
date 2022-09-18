import type { Dispatch, SetStateAction } from "react"
import Konva from "konva"
import type { Stage } from "konva/lib/Stage"
import type { Text as TextType } from "konva/lib/shapes/Text"

type Props = {
  refState: Stage | null
  setSelectShapes: Dispatch<SetStateAction<TextType | null>>
}

const Text = ({ refState, setSelectShapes }: Props) => {
  return (
    <button
      className="
        w-28
        h-28
        p-2
        bg-emerald-500
        text-white
        font-semibold
        rounded-2xl
      "
      onClick={ () => {
        if(!refState?.children || (refState.children && (refState.children?.length > 10))) return

        const text: TextType = new Konva.Text({
          x: 20,
          y: 60,
          text: 'テキストを入力',
          fontSize: 30,
          fontFamily: 'Noto Sans JP',
          lineHeight: 1.5,
          fill: '#ffffff',
          align: 'center',
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
        setSelectShapes(text)
      } }
    >
      テキスト追加
    </button>
  )
}

export default Text