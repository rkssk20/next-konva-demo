type Props = {
  name: string
  icon: JSX.Element
  handle: () => void
}

const CategoryButton = ({ name, handle, icon }: Props) => {
  return (
    <button
      className="
        w-[calc(100%/3)]
        p-2
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
      "
      onClick={ handle }
    >
      { icon }

      { name }
    </button>
  )
}

export default CategoryButton