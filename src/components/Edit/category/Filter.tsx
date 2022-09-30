import { useState, useEffect, ChangeEvent } from "react"
import Konva from "konva"
import type { SelectShapeType } from "@/type/type"

const Filter = ({ selectShape }: { selectShape: SelectShapeType }) => {
  const [blur, setBlur] = useState<number | null>(null)

  console.log(selectShape);
  
  
  useEffect(() => {
    setBlur(selectShape?.attrs.blurRadius)
  }, [selectShape])

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)

    setBlur(number)
    // selectShape?.blurRadius(number)
    console.log(Konva.shapes)
  }

  return (
    <div className="mx-2">
      <p className="">
        ぼかし
      </p>

      <div
        className="
          w-full
          mt-4
          flex
          items-center
        "
      >
        <span className="text-3xl mr-1 select-none material-symbols-rounded">
          &#xe900;
        </span>

        <input
          className="grow mx-1"
          type='range'
          min={ 0 }
          max={ 30 }
          step={ 1 }
          value={ blur ?? 0 }
          onChange={ handleBlur }
        />

        <span className="text-3xl mr-1 select-none material-symbols-rounded">
          &#xe8ff;
        </span>
      </div>
    </div>
  )
}

export default Filter