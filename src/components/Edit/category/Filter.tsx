import type { Stage } from "konva/lib/Stage"
import CategoryButton from "@/atoms/CategoryButton"

type Props = {
  refState: Stage | null
}

const Filter = ({ refState }: Props) => {
  return (
    <CategoryButton
      name='フィルター'
      icon='&#xe43b;'
      handle={ () => {} }
    />
  )
}

export default Filter