import { useState, useEffect } from 'react'
import type { Stage as StageType } from "konva/lib/Stage";

// 画面幅に関するフック
const useScreenWidth = (ref: StageType | null) => {
  const [size, setSize] = useState({
    width: (window.innerWidth < 640) ? (window.innerWidth - 32) : 608,
    height: (window.innerWidth < 640) ? (((window.innerWidth - 32) / 16) * 9) : 342
  })

  // 画面幅の変更
  const handleResize = () => {
    let timeId

    clearTimeout(timeId)

    // 0.5秒ごと
    timeId = window.setTimeout(() => {
      // canvasサイズをセット
      setSize({
        width: (window.innerWidth < 640) ? (window.innerWidth - 32) : 608,
        height: (window.innerWidth < 640) ? (((window.innerWidth - 32) / 16) * 9) : 342
      })

      // 元のキャンバスサイズと比較し、現在のサイズにするための値を求める
      const ration = (window.innerWidth < 640) ? ((window.innerWidth - 32) / size.width) : (640 / size.width)

      // 値をセットして拡大・縮小する
      ref?.scaleX(ration).scaleY(ration)
    }, 500)
  }
  
  useEffect(() =>{
    // 画面幅変更を監視
    window.addEventListener('resize', handleResize)

    return () => {
      // アンマウント時に監視を解除
      window.removeEventListener('resize', handleResize)
    }
  }, [ref])

  return size
}

export default useScreenWidth