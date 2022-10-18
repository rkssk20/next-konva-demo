import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import Konva from "konva"

type Props = {
  fontSize: number
  setFontSize: Dispatch<SetStateAction<number | null>>
  selectKey: string
}

const FontSize = ({ fontSize, setFontSize, selectKey }: Props) => {
  const handleFontSize = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    setFontSize(number)
    // @ts-ignore
    Konva.shapes[selectKey].fontSize(number)
  }

  return (
    <div className="mt-6">
      <p>フォントサイズ</p>

      <div
        className="
          w-full
          mt-2
          flex
          justify-between
        "
      >
        <input
          className="w-[calc(100%-50px)]"
          type='range'
          min={ 10 }
          max={ 400 }
          step={ 1 }
          value={ fontSize }
          onChange={ handleFontSize }
        />

        <span className="ml-2 select-none">
          { fontSize }
        </span>
      </div>
    </div>
  )
}

export default FontSize