## Next.jsとKonva(react-konva)を組み合わせたデモ

[https://next-konva-demo.vercel.app](https://next-konva-demo.vercel.app)

画像にテキストなどを重ねる簡単なエディターです

### vercelデプロイエラーの対応
```
npm install canvas@2.6.1
brew install pkg-config cairo pango libpng jpeg giflib librsvg
brew doctor
```

canvasが必要で、それをインストールするためにbrewインストールもする。

その後、vercelデプロイ時にnodeのversionが対応していないと言われるので、vercelのプロジェクトからsetting >> Generalを開いてnodeのversionを14.xに下げる

また、react-konvaが使用されるコンポーネントをdynamic importし、{ ssr: false }に設定する