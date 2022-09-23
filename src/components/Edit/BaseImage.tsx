import { useRef, useEffect } from 'react';
import { Image } from 'react-konva';
import { Image as KonvaImage } from 'konva/lib/shapes/Image';
import useImage from '@/hooks/useImage'

type Props = {
  cropImage: string
}

const BaseImage = ({ cropImage }: Props) => {
  const ref = useRef<KonvaImage>(null)
  const image = useImage(cropImage)

  // 最初に一度だけ画像サイズをセットする
  // (画面幅変更時、画像はcanvasの比率と連動する)
  useEffect(() => {
    ref.current
    ?.width(
      (window.innerWidth < 528) ? (window.innerWidth - 32) :
        (window.innerWidth < 768) ? 496 :
          (window.innerWidth < 1056) ? (((window.innerWidth - 32) - 48) - 376) : 600
    ).height(
      (window.innerWidth < 528) ? ((window.innerWidth - 32) * 0.563) :
        (window.innerWidth < 768) ? 279.248 :
          (window.innerWidth < 1056) ? ((((window.innerWidth - 32) - 48) - 376) * 0.563) : 337.8
    )
  }, [])

  return (
    <Image ref={ ref } image={ image } alt='編集中の画像' />
  )
}

export default BaseImage