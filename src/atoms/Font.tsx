import type { Dispatch, SetStateAction } from "react"
import Head from "next/head"

type Props = {
  setTargetRef: Dispatch<SetStateAction<HTMLDivElement | null>> | undefined
  fontFamily: string
  handleFont: (fontFamily: string) => void
}

const Font = ({ setTargetRef, fontFamily, handleFont }: Props) => {
  return (
    <div ref={ setTargetRef }>
      <Head>
        <style>
          @import url({`https://fonts.googleapis.com/css2?family=${ fontFamily.replace(/ /g, '+') }&text=${ fontFamily.replace(/ /g, '') }&display=swap`});
        </style>
      </Head>

      <button
        style={{ fontFamily: fontFamily }}
        className="
          w-[calc(100%-64px)]
          my-1
          mx-8
          p-2
          border
          border-ogp-border
          border-solid
          duration-200
          hover:bg-[#efefef]
          active:bg-[#e5e5e5]
          rounded-xl
        "
        onClick={ () => handleFont(fontFamily) }
      >
        { fontFamily }
      </button>
    </div>
  )
}

export default Font