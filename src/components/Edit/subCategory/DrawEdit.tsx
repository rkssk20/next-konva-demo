import type { SelectShapeType } from "@/type/type"


const DrawEdit = ({ selectShape }: { selectShape: SelectShapeType }) => {
  return (
    <div>
      <button>
        ペン
      </button>

      <button>
        消しゴム
      </button>
    </div>
  )
}

export default DrawEdit