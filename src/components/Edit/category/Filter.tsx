import { useState, useEffect } from "react";
import Konva from "konva"

const Filter = ({ selectKey }: { selectKey: string }) => {
  const [value, setValue] = useState<number | null>(null)

  useEffect(() => {
    setValue(Konva.shapes[selectKey].attrs.blurRadius)
  }, [selectKey])
  
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
          value={ value ?? 0 }
          onChange={ (e) => {
            const number = Number(e.target.value)
            Konva.shapes[selectKey].blurRadius(number)
            setValue(number)
          }}
        />

        <span className="text-3xl mr-1 select-none material-symbols-rounded">
          &#xe8ff;
        </span>
      </div>
    </div>
  )
}

export default Filter