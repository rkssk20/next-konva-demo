import { useState, useEffect } from 'react'
import Konva from 'konva';

// 画面幅に関するフック
const useScreenWidth = () => {
  const [defaultWidth, setDefaultWidth] = useState(document.querySelector('#stage-parent')?.clientWidth)

  useEffect(() => {
    const parent = document.querySelector('#stage-parent')
    
    parent && setDefaultWidth(parent.clientWidth);

  }, [document.querySelector('#stage-parent')])

  useEffect(() =>{
      // 画面幅の変更
  const handleResize = () => {
    let timeId

    clearTimeout(timeId)

    // 0.5秒ごと
    timeId = window.setTimeout(() => {
      const parent = document.querySelector('#stage-parent')

      if(!parent || !defaultWidth) return

      const ration = parent.clientWidth / defaultWidth

      Konva.stages[0].width(parent.clientWidth)
      Konva.stages[0].height(parent.clientWidth * 0.5625)
      Konva.stages[0].scale({ x: ration, y: ration })
    }, 500)
  }

    // 画面幅変更を監視
    window.addEventListener('resize', handleResize)

    return () => {
      // アンマウント時に監視を解除
      window.removeEventListener('resize', handleResize)
    }
  }, [document.querySelector('#stage-parent')])

  return defaultWidth
}

export default useScreenWidth