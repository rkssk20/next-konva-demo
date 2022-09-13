Next.jsとKonva(react-konva)を組み合わせたデモ

画像にテキストなどを重ねる簡単なエディター

### vercelデプロイエラーの対応
```
npm install canvas@2.6.1
brew install pkg-config cairo pango libpng jpeg giflib librsvg
brew doctor
```

canvasが必要で、それをインストールするためにbrewインストールもする。

その後、vercelデプロイ時にnodeのversionが対応していないと言われるので、vercelのプロジェクトからsetting >> Generalを開いてnodeのversionを12.xに下げる