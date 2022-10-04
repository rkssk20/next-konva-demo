import { useState, useEffect, ChangeEvent } from "react";
import Konva from "konva"

const Filter = ({ selectKey }: { selectKey: string }) => {
  const [brightness, setBrightness] = useState<number>(Konva.shapes[selectKey].attrs.brightness / 0.1)
  const [contrast, setContrast] = useState<number>(Konva.shapes[selectKey].attrs.contrast / 10)
  const [saturation, setSaturation] = useState<number>(Konva.shapes[selectKey].attrs.saturation / 0.4)
  const [blur, setBlur] = useState<number>(Konva.shapes[selectKey].attrs.blurRadius / 2.5)
  const [pixelate, setPixelate] = useState<number>((Konva.shapes[selectKey].attrs.pixelSize / 3) - 1)
  const [noise, setNoise] = useState<number>(Konva.shapes[selectKey].attrs.noise / 0.1)
  const [sepia, setSepia] = useState<number>(() => {
    const index = Konva.shapes[selectKey].attrs.filters.findIndex((item: any) => (item.name === 'Sepia'))
    return (index > 0) ? 1 : 0 
  })
  
  // 明るさ
  const handleBrightness = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    Konva.shapes[selectKey].brightness(number * 0.1)
    setBrightness(number)
  }

  // コントラスト
  const handleContrast = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    Konva.shapes[selectKey].contrast(number * 10)
    setContrast(number)
  }

  // 彩度
  const handleSadturation = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    Konva.shapes[selectKey].saturation(number * 0.4)
    setSaturation(number)
  }

  // ぼかし
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    Konva.shapes[selectKey].blurRadius(number * 2.5)
    setBlur(number)
  }

  // モザイク
  const handlePixelate = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    Konva.shapes[selectKey].pixelSize((number + 1) * 3)
    setPixelate(number)
  }

  // ノイズ
  const handleNoise = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    Konva.shapes[selectKey].noise(number * 0.1)
    setNoise(number)
  }

  // セピア
  const handleSepia = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === '1') {
      Konva.shapes[selectKey].filters([
        Konva.Filters.Brighten,
        Konva.Filters.Contrast,
        Konva.Filters.HSV,
        Konva.Filters.Blur,
        Konva.Filters.Pixelate,
        Konva.Filters.Noise,
        Konva.Filters.Sepia
      ])
    } else {
      Konva.shapes[selectKey].filters([
        Konva.Filters.Brighten,
        Konva.Filters.Contrast,
        Konva.Filters.HSV,
        Konva.Filters.Blur,
        Konva.Filters.Pixelate,
        Konva.Filters.Noise
      ])
    }

    setSepia(Number(e.target.value))
  }

  const filter_list = [{
    name: '明るさ',
    handle: handleBrightness,
    value: brightness,
    min: -10,
    max: 10,
    step: 1
  }, {
    name: 'コントラスト',
    handle: handleContrast,
    value: contrast,
    min: -10,
    max: 10,
    step: 1
  }, {
    name: '彩度',
    handle: handleSadturation,
    value: saturation,
    min: -10,
    max: 10,
    step: 1
  }, {
    name: 'ぼかし',
    handle: handleBlur,
    value: blur,
    min: 0,
    max: 10,
    step: 1
  }, {
    name: 'モザイク',
    handle: handlePixelate,
    value: pixelate,
    min: 0,
    max: 10,
    step: 1
  }, {
    name: 'ノイズ',
    handle: handleNoise,
    value: noise,
    min: 0,
    max: 10,
    step: 1
  }, {
    name: 'セピア',
    handle: handleSepia,
    value: sepia,
    min: 0,
    max: 1,
    step: 1
  }]

  return (
    <div className="mx-2 mb-6 overflow-y-scroll">
      {
        filter_list.map(item => (
          <div key={ item.name } className="mt-6">
            <p>{ item.name }</p>

            <div
              className="
                w-full
                mt-2
                flex
                justify-between
              "
            >
              <input
                className="w-[calc(100%-50px)]"
                type='range'
                min={ item.min }
                max={ item.max }
                step={ item.step }
                value={ item.value }
                onChange={ item.handle }
              />

              <span className="ml-2 select-none">
                { item.value }
              </span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Filter