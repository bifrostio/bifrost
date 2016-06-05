# Bifrost
Hackpad: https://g0v.hackpad.com/Bifrost--C8AgQKHhreC

在台灣的災害物資運送通常都是透過媒體登高一呼，而物資捐贈常因為沒有適當的溝通管道，導致物資過多、捐贈不需要的物資甚至部分地區根本接收不到任何物資。

Bifrost 希望建立一個雙向的物資管理平台，讓受贈者與捐贈者可以在同一個平台上，知道目前捐贈的狀況以及哪邊需要什麼種類的物資。

## Getting started
Bifrost 採用 Node.js 開發，前端採用 React，後端採用 Loopback (node.js)，在非 production 環境時，資料僅會儲存在記憶體，所以開發時不需要安裝任何資料庫。

執行 bifrost 僅需兩個步驟：

```shell
$ npm install
$ npm start
```

第一行指令將會安裝所需相依套件，第二行指令則用於執行本地 web server，啟動後開啟瀏覽器至 http://0.0.0.0:3000/ 即可看到專案列表

## Contribution

若找到任何 bugs，請使用 [github issue tracker](https://github.com/bifrostio/bifrost/issues) 新增 issue，也歡迎直接送 pull request 協助解決問題！

## LICENSE

本專案採用 MIT 授權，Landing Page 授權為 Apache 授權，部分圖片取自 Flickr，授權請見 [圖片授權](https://github.com/bifrostio/bifrostio.github.io/blob/master/PHOTOS_LICENSE)。
