type Props = {
  title: string
  backIcon: JSX.Element
  forwardIcon: JSX.Element
}

const Header = ({ title, backIcon, forwardIcon }: Props) => {
  return (
    <div
      className='
        p-2
        fixed
        top-0
        right-0
        left-0
        flex
        items-center
        justify-between
        bg-white
        z-10
      '
    >
      { backIcon }

      <p className='text-xl font-bold text-center'>
        { title }
      </p>

      { forwardIcon }
    </div>
  )
}

export default Header