import type { Dispatch, SetStateAction } from "react"
import type { Text } from "konva/lib/shapes/Text"
import type { Line } from "konva/lib/shapes/Line"

export type SelectShapeType = Text | Line | null

export type SetSelectShapeType = Dispatch<SetStateAction<Text | Line | null>>