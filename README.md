# URL Navigate Web App

[![Build Status](https://travis-ci.org/poychang/url-navigate-web-app.svg?branch=master)](https://travis-ci.org/poychang/url-navigate-web-app)

## 建置

```bash
npm install
npm run build
```

## 佈署

將 `dist` 資料夾下的檔案，複製至網頁伺服器的網站目錄下即可。

為使路由正確運作，必須設定網頁伺服器以 `index.html` 作為後備頁面，請針對您所使用的網頁伺服器，設定對應的路由改寫設定規則。

- Apache 網頁伺服器，請將 `.htaccess` 複製至網站跟目錄下
- 使用 IIS 網頁伺服器，則將 `web.config` 複製至網站跟目錄下
