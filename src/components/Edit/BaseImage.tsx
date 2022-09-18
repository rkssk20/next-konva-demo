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
    ?.width((window.innerWidth < 640) ? (window.innerWidth - 32) : 608)
    .height((window.innerWidth < 640) ? (((window.innerWidth - 32) / 16) * 9) : 342)
  }, [])

  return (
    <Image ref={ ref } image={ image } alt='編集中の画像' />
  )
}

export default BaseImage