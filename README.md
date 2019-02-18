# 生協の知恵袋 ウェブUI版

[![Build Status](https://travis-ci.org/coop-mojo/moecoop-webui.svg?branch=master)](https://travis-ci.org/coop-mojo/moecoop-webui)

生協の知恵袋のウェブUI版です

ご利用は[こちら](http://fukuro.coop.moe/)からどうぞ！
## ビルド方法

### 依存関係のインストール

```console
$ yarn install
```

# ホットリロード込みのサーバー立ち上げ (localhost:8080)
```console
$ yarn run serve
```

# ビルド
```console
$ yarn run build
```

### テストを実行
```console
$ yarn run test
```

### Lint を実行して修正
```console
$ yarn run lint
```

### ユニットテストを実行
```console
$ yarn run test:unit
```

## 開発に参加したい人向け
API の仕様については [swagger-ui](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/coop-mojo/moecoop-common/master/api/swagger.yml) か [swagger-editor](http://editor.swagger.io/?url=https://raw.githubusercontent.com/coop-mojo/moecoop-common/master/api/swagger.yml) をご覧ください。

