import type { Dispatch, SetStateAction } from "react"

type Props = {
  tab_list: string[]
  tabNumber: number
  setTabNumber: Dispatch<SetStateAction<number>>
}

const Tabs = ({ tab_list, tabNumber, setTabNumber }: Props) => {
  return (
    <div
      className="
        flex
        overflow-scroll
        border-b
        border-[#cfd9de]
        border-solid
      "
    >
      {
        tab_list.map((item, index) => (
          <button
            className={
              (tabNumber === index) ?
              `
                p-2
                min-w-[90px]
                min-h-[60px]
                text-xs
                border-b-4
                border-solid
                border-[#4c6cb3]
                `
                :
                `
                p-2
                min-w-[90px]
                min-h-[60px]
                text-xs
                duration-200
                border-b-4
                border-transparent
                hover:bg-[#efefef]
                active:bg-[#e5e5e5]
              `
            }
            key={ item }
            onClick={ () => setTabNumber(index) }
          >
            { item }
          </button>
        ))
      }
    </div>
  )
}

export default Tabs