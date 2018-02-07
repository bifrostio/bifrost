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

在物資站的頁面瀏覽物資後，在畫面的最底端是捐贈按鈕，點擊後會來到捐贈物品的頁面。選擇捐贈數量、填寫完聯絡資訊送出後，則會出現寄送資訊，其中寄送資訊會提示在地址欄可以填寫編號，可以快速的讓收貨人員點收此筆物資是由哪位捐贈人所捐贈。

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
Bifrost 採用 Node.js 6.x 系列開發，前端採用 React，後端採用 Loopback (node.js)，在非 production 環境時，資料僅會儲存在記憶體，所以開發時不需要安裝任何資料庫。

執行 bifrost 僅需兩個步驟：

```shell
$ npm install
$ npm start
```

第一行指令將會安裝所需相依套件，第二行指令則用於執行本地 web server，啟動後開啟瀏覽器至 http://0.0.0.0:3000/ 即可看到專案列表

### 設定檔

所有的伺服器設定都在 `/server` 目錄底下，其中結尾有 `production` 的設定檔案是在 `NODE_ENV=production` 時才會啟用，比如說資料庫的基礎設定在 `datastores.json`，其中是使用 memory database，伺服器停止或重開後後所有資料都會消失。但是在 `datasources.production.js` 則用 mongodb 資料庫，所有資料都會儲存在資料庫中。

另外在開發模式可以用 http://0.0.0.0:3000/explorer/ 進入 API explorer，可以直接用 API 呼叫 bifrost 所提供的所有功能，但此功能只有在開發模式才可以使用，`production` 模式並沒有開放 API explorer。

![API explorer](/assets/screenshot-api-explorer.png)

### 資料庫表格

系統裡所有的資料庫表格都放在 `/common/models/` 裡面的 JSON 檔案，簡介如下：

* address: 內部用的地址表格
* batch: 一個捐贈批次，其中可能包含多項物資以及捐贈者聯繫資訊
* contact: 內部用的聯絡人表格
* project: 專案，一個專案內會有許多個物資站。當初表格設計時是可以容納多個專案，但是目前通常都只有一個專案。
* provision-activity: 物資動態，當每次有物資接收時，會產生一筆物資動態，紀錄本次物資接收時的物資數量
* provision-requirement: 物資需求，開設一個物資站時會填寫有多少物資需求會登記在此表格
* station: 物資站
* user: 使用者

每個表格之間的關係，也都可以在這些 JSON 檔案裡面的 relations 欄位找到。權限控管也都在 JSON 當中。

### 預設資料

在開發模式啟動伺服器時，系統將會自動建立一組測試用的資料集，包含了一個展示用的物資站、所需物資、管理者帳號等等，所有展示用的資料都會在 `/server/boot` 裡面定義。

## Contribution

若找到任何 bugs，請使用 [github issue tracker](https://github.com/bifrostio/bifrost/issues) 新增 issue，也歡迎直接送 pull request 協助解決問題！

## LICENSE

本專案採用 MIT 授權，Landing Page 授權為 Apache 授權，部分圖片取自 Flickr，授權請見 [圖片授權](https://github.com/bifrostio/bifrostio.github.io/blob/master/PHOTOS_LICENSE)。
