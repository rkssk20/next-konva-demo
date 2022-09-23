import Head from "next/head"

type Props = {
  fontFamily: string
}

const Font = ({ fontFamily }: Props) => {
  return (
    <div>
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
      >
        { fontFamily }
      </button>
    </div>
  )
}

export default Font