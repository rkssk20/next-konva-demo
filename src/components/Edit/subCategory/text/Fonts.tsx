import { ChangeEvent, useEffect, useState } from "react"
import Konva from "konva"
import Font from "@/atoms/Font"

const Fonts = ({ selectKey }: { selectKey: string }) => {
  const [value, setValue] = useState('')

  const fonts = [
    'BIZ UDGothic',
    'BIZ UDMincho',
    'BIZ UDPGothic',
    'BIZ UDPMincho',
    'Dela Gothic One',
    'DotGothic16',
    'Hachi Maru Pop',
    'Hina Mincho',
    'Kaisei Decol',
    'Kaisei HarunoUmi',
    'Kaisei Opti',
    'Kaisei Tokumin',
    'Kiwi Maru',
    'Klee One',
    'Kosugi',
    'Kosugi Maru',
    'M PLUS 1',
    'M PLUS 1 Code',
    'M PLUS 1p',
    'M PLUS 2',
    'M PLUS Rounded 1c',
    'Mochiy Pop One',
    'Mochiy Pop P One',
    'Murecho',
    'New Tegomin',
    'Noto Sans JP',
    'Noto Serif JP',
    'Potta One',
    'Rampart One',
    'Reggae One',
    'RocknRoll One',
    'Sawarabi Gothic',
    'Sawarabi Mincho',
    'Shippori Antique',
    'Shippori Antique B1',
    'Shippori Mincho',
    'Shippori Mincho B1',
    'Stick',
    'Train One',
    'Yomogi',
    'Yuji Boku',
    'Yuji Mai',
    'Yuji Syuku',
    'Yusei Magic',
    'Zen Antique',
    'Zen Antique Soft',
    'Zen Kaku Gothic Antique',
    'Zen Kaku Gothic New',
    'Zen Kurenaido',
    'Zen Maru Gothic',
    'Zen Old Mincho'
  ]

  const handleFonts = (e: ChangeEvent<HTMLSelectElement>) => {
    if(!selectKey) return

    setValue(e.target.value)
    // @ts-ignore
    Konva.shapes[selectKey].fontFamily(`"${ e.target.value}"`)
  }

  useEffect(() => {
    setValue(Konva.shapes[selectKey].attrs.fontFamily)
  }, [selectKey])

  return (
    <div className="mx-2 flex-1 overflow-y-scroll">
      {
        fonts.map(item => (
          <Font key={ item } fontFamily={ item } />
        ))
      }
    </div>
  )
}

export default Fonts