import { useEffect, useState } from "react"
import Konva from "konva"
import { Text } from "konva/lib/shapes/Text"

const Format = ({ selectKey }: { selectKey: string }) => {
  const [align, setAlign] = useState<string>('')
  const [color, setColor] = useState('')

  useEffect(() => {
    setAlign(Konva.shapes[selectKey].attrs.align)
    setColor(Konva.shapes[selectKey].attrs.fill)
  }, [selectKey])

  return (
    <div className="mt-4 px-6">
      <div>
        <p>整列</p>

        <div
          className="
            mt-2
            flex
            justify-between
            overflow-x-scroll
          "
        >
          {
            ['left', 'center', 'right'].map(item => (
              <button
                key={ item }
                className={
                  `
                    min-w-[90px]
                    p-2
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-xs
                    rounded-2xl
                    duration-200
                    border
                    border-ogp-border
                    border-solid
                    hover:bg-[#efefef]
                    active:bg-[#e5e5e5]
                    ${
                      (item === align) && 'bg-[#e5e5e5]'
                    }
                    `
                }
                onClick={ () => {
                  // @ts-ignore
                  Konva.shapes[selectKey].align(item)
                  setAlign(item)
                }}
                
              >
                {
                  (item === 'left') ? 
                    <div className="pb-2 text-2xl material-symbols-rounded">
                      &#xe236;
                    </div>
                  : (item === 'center') ?
                    <div className="pb-2 text-2xl material-symbols-rounded">
                      &#xe234;
                    </div>
                  :
                    <div className="pb-2 text-2xl material-symbols-rounded">
                      &#xe237;
                    </div>
                }

                {
                  (item === 'left') ? '左' :
                  (item === 'center') ? '中央' : '右'
                }
              </button>
            ))
          }
        </div>
      </div>

      <div className="mt-6">
        <p>カラー</p>

        <div className="mt-2">
          <input
            type='color'
            className="
              w-full
              h-20
              p-0
              bg-none
              border-0
              border-none
              cursor-pointer
              appearance-none
            "
            value={ color }
            onChange={ e => {
              Konva.shapes[selectKey].fill(e.target.value)
              setColor(e.target.value)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Format