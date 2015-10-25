# New Bifrost

我們正在撰寫新版的 Bifrost，請到[這個 wiki 頁面](https://github.com/bifrostio/bifrost/wiki/New-Bifrost)了解進度與計畫

# Bifrost
Hackpad: https://g0v.hackpad.com/Bifrost--C8AgQKHhreC

在台灣的災害物資運送通常都是透過媒體登高一呼，而物資捐贈常因為沒有適當的溝通管道，導致物資過多、捐贈不需要的物資甚至部分地區根本接收不到任何物資。

Bifrost 希望建立一個雙向的物資管理平台，讓受贈者與捐贈者可以在同一個平台上，知道目前捐贈的狀況以及哪邊需要什麼種類的物資。

## Getting started
Bifrost 採用 Node.js 開發，前端採用 Angular.js，後端採用 Loopback (node.js)，在非 production 環境時，資料僅會儲存在記憶體，所以開發時不需要安裝任何資料庫。

執行 bifrost 僅需兩個步驟：

```shell
$ npm install
$ npm start
```

第一行指令將會安裝 node 以及 bower 所需相依套件，第二行指令則用於執行本地 web server，啟動後開啟瀏覽器至 http://0.0.0.0:3000/ 即可看到專案列表

# Deployment & Azure
本專案的 DEMO 網站採用 Docker 架設於 Microsoft Azure，採用以下服務：

* Azure Virtual Machine (CoreOS)
* Azure Storage
* Azure SQL Databases

若您要 deploy 本專案到您的機器，我們有提供 Dockerfile 用於建置出自己的 container image:

```shell
$ docker build -t <YOUR_NAME>/bifrost
```

或是也可以採用我們建置好的 container image:

```shell
$ docker pull yurenju/bifrost
$ docker run -p 3000:3000 -d yurenju/bifrost
```

在開發環境中 Bifrost  並不會連結到 Azure SQL Databases 與 Azure Storage，Production 與 Development 環境差異如下：

<div style="text-align: center;"><img src="http://bifrostio.github.io/img/bifrost.png" alt="Bifrost architecture" width="80%"></div>

若要切換至 production 請參考以下環境變數，在 docker 執行時使用 `-e foo=bar` 指定環境變數：

* **NODE_ENV**: 若要採用 production 請設定成 `production`
* **DBHOST**: 設定 SQL Server 的 URL
* **DBNAME**: 資料庫名稱
* **DBUSER**: 使用者
* **DBPASSWORD**: 密碼
* **STORAGEACCOUNT**: Azure Storage 的帳號
* **STORAGEKEY**: Azure Storage 的 Access Key

## Contribution

若找到任何 bugs，請使用 [github issue tracker](https://github.com/bifrostio/bifrost/issues) 新增 issue，也歡迎直接送 pull request 協助解決問題！

## LICENSE

本專案採用 MIT 授權，Landing Page 授權為 Apache 授權，部分圖片取自 Flickr，授權請見 [圖片授權](https://github.com/bifrostio/bifrostio.github.io/blob/master/PHOTOS_LICENSE)。
