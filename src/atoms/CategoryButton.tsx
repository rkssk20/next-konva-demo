type Props = {
  name: string
  icon: JSX.Element
  handle: () => void
  select: boolean
}

const CategoryButton = ({ name, handle, icon, select }: Props) => {
  return (
    <button
      className={`
        w-[calc(100%/3)]
        p-2
        flex
        flex-col
        items-center
        justify-center
        border-b-4
        ${select ?
          `
            border-[#4c6cb3]
          `
          :
          `
            border-transparent
            duration-200
            hover:bg-[#efefef]
            active:bg-[#e5e5e5]
          `
        }
      `}
      onClick={ handle }
    >
      { icon }

      { name }
    </button>
  )
}

export default CategoryButton