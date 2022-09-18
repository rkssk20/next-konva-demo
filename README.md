## Next.jsとKonva(react-konva)を組み合わせたデモ

[https://next-konva-demo.vercel.app](https://next-konva-demo.vercel.app)

画像にテキストなどを重ねる簡単なエディターです

### vercelデプロイエラーの対応
```
npm install canvas@2.9.1
brew install pkg-config cairo pango libpng jpeg giflib librsvg
brew doctor
```

canvas@2.9.1が必要で、それをインストールするためにbrewインストールもする。

react-konvaが使用されるコンポーネントをdynamic importし、{ ssr: false }に設定する