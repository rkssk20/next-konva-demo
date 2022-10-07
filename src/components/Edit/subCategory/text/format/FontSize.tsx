import { Dispatch, SetStateAction } from "react"

type Props = {
  fontSize: number | null
  setFontSize: Dispatch<SetStateAction<number | null>>
  selectKey: string
}

const FontSize = ({ fontSize, setFontSize, selectKey }: Props) => {
  const handleFontSize = () => {

  }

  return (
    <div className="mt-6">
      <p>サイズ</p>

      <div className="mt-6">

      </div>
    </div>
  )
}

export default FontSize