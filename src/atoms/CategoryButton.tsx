type Props = {
  name: string
  icon: JSX.Element
  handle: () => void
}

const CategoryButton = ({ name, handle, icon }: Props) => {
  return (
    <button
      className="
        w-28
        h-28
        p-2
        flex
        flex-col
        items-center
        justify-center
        font-semibold
        rounded-2xl
      "
      onClick={ handle }
    >
      <span className="pb-2 text-4xl material-symbols-rounded">
        { icon }
      </span>

      { name }
    </button>
  )
}

export default CategoryButton