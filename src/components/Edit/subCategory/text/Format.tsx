import { useState, useEffect } from "react"
import Konva from "konva"

const Format = ({ selectKey }: { selectKey: string }) => {
  const [align, setAlign] = useState<string>('')

  useEffect(() => {
    setAlign(Konva.shapes[selectKey].attrs.align)
  }, [selectKey])

  return (
    <div className="mt-4 px-6 overflow-y-scroll">
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
    </div>
  )
}

export default Format