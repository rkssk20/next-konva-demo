
type Props = {
  name: string
  icon: JSX.Element
  handle: () => void
  disabled: boolean
}

const SubCategoryButton = ({ name, icon, handle, disabled }: Props) => {
  return (
    <button
      className={
        !disabled ?
        `
          min-w-[90px]
          p-2
          flex
          flex-col
          items-center
          justify-center
          text-xs
          text-gray-400
          border-b-4
          border-transparent
          rounded-2xl
        `
        :
        `
          min-w-[90px]
          p-2
          flex
          flex-col
          items-center
          justify-center
          text-xs
          duration-200
          border-b-4
          border-transparent
          hover:bg-[#efefef]
          active:bg-[#e5e5e5]
          rounded-2xl
        `
      }
      onClick={ handle }
      disabled={ !disabled }
    >
      { icon }
      { name }
    </button>
  )
}

export default SubCategoryButton