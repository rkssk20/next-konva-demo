type Props = {
  title: string
  backIcon: JSX.Element
  forwardIcon: JSX.Element | undefined
}

const Header = ({ title, backIcon, forwardIcon }: Props) => {
  return (
    <div
      className='
        h-[53px]
        p-2
        fixed
        top-0
        inset-x-0
        flex
        items-center
        justify-between
        bg-white
        z-10
      '
    >
      { backIcon }

      <p
        className='
          w-max
          mx-auto
          absolute
          inset-x-0
          text-xl
          font-bold
          text-center
        '
      >
        { title }
      </p>

      { forwardIcon }
    </div>
  )
}

export default Header