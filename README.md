# Bifrost
Hackpad: https://g0v.hackpad.com/Bifrost--C8AgQKHhreC

在台灣的災害物資運送通常都是透過媒體登高一呼，而物資捐贈常因為沒有適當的溝通管道，導致物資過多、捐贈不需要的物資甚至部分地區根本接收不到任何物資。

Bifrost 希望建立一個雙向的物資管理平台，讓受贈者與捐贈者可以在同一個平台上，知道目前捐贈的狀況以及哪邊需要什麼種類的物資。

## 現況
目前這個專案沒有太積極地開發，如果你仍對這個專案有興趣開發，請在 Facebook 或 Twitter 聯絡 @yurenju。

## 功能介紹

### 前台使用者介面

在前台部分主要有三個頁面：
* 首頁：顯示專案簡介以及連結到地圖與物資站頁面
* 地圖：在地圖上顯示所有的物資站
* 物資站：單一物資站頁面，裡面包含了聯絡資訊以及所需物資

![Map page screenshot](/assets/screenshot-map.png)
![Station page screenshot](/assets/screenshot-station.png)

在物資站的頁面瀏覽物資後，在畫面的最底端是捐贈按鈕，點擊後會來到捐贈物品的頁面。選擇捐贈數量、填寫完聯絡資訊送出後，則會出現寄送資訊，其中寄送資訊會提示在地址欄可以填寫編號，可以快速的讓收貨人員點收此筆物資是由哪位捐贈人所捐贈。

![Donation 1 screenshot](/assets/screenshot-donation-1.png)
![Donation 2 screenshot](/assets/screenshot-donation-2.png)

### 後台管理介面

後台的管理者介面，預設的帳號密碼如下：
* 帳號：admin@example.com
* 密碼：1234

登入後可看到所有的物資需求，也可以在此編輯更改物資需求。

![Admin 1 screenshot](/assets/screenshot-admin-1.png)

點選 **點收物資** 則會出現目前已經捐贈的捐贈人以及進度，如果需要點收物資時則會在此介面點收。每個捐贈者都會有自己的編號，收貨人員可以依此快速找到捐贈者。

![Admin 2 screenshot](/assets/screenshot-admin-2.png)

## 開發
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
