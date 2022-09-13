Next.jsとKonva(react-konva)を組み合わせたデモ

画像にテキストなどを重ねる簡単なエディター

### vercelデプロイエラーの対応
```
npm install canvas@2.6.1
brew install pkg-config cairo pango libpng jpeg giflib librsvg
brew doctor
```

canvasが必要で、それをインストールするためにbrewインストールもする。

また、react-konvaが使用されるコンポーネントをdynamic importし、{ ssr: false }に設定する