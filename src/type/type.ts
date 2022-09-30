import type { Dispatch, SetStateAction } from "react"
import type { Image } from "konva/lib/shapes/Image"
import type { Text } from "konva/lib/shapes/Text"
import type { Line } from "konva/lib/shapes/Line"

export type SelectShapeType = Image | Text | Line | null

export type SetSelectShapeType = Dispatch<SetStateAction<Image | Text | Line | null>>