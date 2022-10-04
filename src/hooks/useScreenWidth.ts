import { useState, useEffect } from 'react'
import Konva from 'konva';

// 画面幅に関するフック
const useScreenWidth = () => {
  const [size, setSize] = useState({
    width:
      (window.innerWidth < 528) ? (window.innerWidth - 32) :
        (window.innerWidth < 768) ? 496 :
          (window.innerWidth < 1056) ? (((window.innerWidth - 32) - 48) - 376) : 600,
    height:
      (window.innerWidth < 528) ? ((window.innerWidth - 32) * 0.563) :
        (window.innerWidth < 768) ? 279.248 :
          (window.innerWidth < 1056) ? ((((window.innerWidth - 32) - 48) - 376) * 0.563) : 337.8
    })

  // 画面幅の変更
  const handleResize = () => {
    let timeId

    clearTimeout(timeId)

    // 0.5秒ごと
    timeId = window.setTimeout(() => {
      const width =
      (window.innerWidth < 528) ? (window.innerWidth - 32) :
        (window.innerWidth < 768) ? 496 :
          (window.innerWidth < 1056) ? (((window.innerWidth - 32) - 48) - 376) : 600

      const height =
      (window.innerWidth < 528) ? ((window.innerWidth - 32) * 0.563) :
        (window.innerWidth < 768) ? 279.248 :
          (window.innerWidth < 1056) ? ((((window.innerWidth - 32) - 48) - 376) * 0.563) : 337.8

      // canvasサイズをセット
      setSize({ width, height })

      // 元のキャンバスサイズと比較し、現在のサイズにするための値を求める
      const ration = width / size.width

      // 値をセットして拡大・縮小する
      Konva.stages[0].width(width)
      Konva.stages[0].height(height)
      Konva.stages[0].scale({ x: ration, y: ration })
    }, 500)
  }

  useEffect(() =>{
    // 画面幅変更を監視
    window.addEventListener('resize', handleResize)

    return () => {
      // アンマウント時に監視を解除
      window.removeEventListener('resize', handleResize)
    }
  }, [Konva.stages[0]])

  return size
}

export default useScreenWidth