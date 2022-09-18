import { useEffect, useRef, LegacyRef } from 'react';
import { Text } from 'react-konva';
import { Text as TextType } from 'konva/lib/shapes/Text';

const TextArea = () => {
  const ref: LegacyRef<TextType> = useRef(null)

  useEffect(() => {
    if(!ref.current) return
    
    ref.current
    .fill('#ffffff')
    .fontFamily('Noto Sans JP')
    .fontSize(30)
    .lineHeight(1.5)
    .draggable(true)
    .text('テキストを入力')
    .absolutePosition({
      x: (window.innerWidth < 640) ? (((window.innerWidth - 32) / 2) - (ref.current.textWidth / 2)) : (304 - (ref.current.textWidth / 2)),
      y: (window.innerWidth < 640) ? (((((window.innerWidth - 32) / 16) * 9) / 2) - (ref.current.textHeight / 2)): (171 - (ref.current.textHeight / 2))
    })
    .on('dragend', () => {
      if(!ref.current) return

      const width = (window.innerWidth < 640) ? (window.innerWidth - 32) : 608
      const height = (window.innerWidth < 640) ? (((window.innerWidth - 32) / 16) * 9) : 342

      ref.current.absolutePosition({
        x: ((ref.current.attrs.x - ref.current.textWidth) < (-ref.current.textWidth * 2)) ? 5 : (ref.current.attrs.x > (width - 10)) ? (width - 50) : ref.current.attrs.x,
        y: ((ref.current.attrs.y - ref.current.textHeight) < (-ref.current.textHeight * 2)) ? 5 : (ref.current.attrs.y > (height - 10)) ? (height - 50) : ref.current.attrs.y
      })
    })
  }, [])

  return <Text ref={ ref } />
}

export default TextArea