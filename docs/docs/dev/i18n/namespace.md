---
id: i18n-namespace
title: Namespace
sidebar_label: Namespace
------

## 名前空間

### 使用する名前空間

現在、以下の4つの名前空間が用意されています。

|NS|用途|
|----|----|
|app|各component、各container関連|
|common|サイト関係(アプリ名など)、UI関係(ボタンなど)、フォーム関連|
|glossary|用語集。用語や定型文など|
|location|国名や地名など。CSCに準拠した構造を目標|

名前空間`validation`の追加も検討されています。

### 各名前空間の説明

#### 名前空間:`app`

##### 用途

各containerや各componentsで使われるものを使用します。

##### 構造

```
app
├ containers	    // 各containerで使うもの
│   └ [各container]  // e.g. home
└ components	    // 各componentで使うもの
    └ [各component]
```

##### 使用例

例、`home` componentのtitleを設定する場合

`./src/locales/ja/app.json`
```
{
  "components": {
    "home": {
      "title": "タイトル"
    }
  }
}
```

#### 名前空間:`common`

##### 用途

アプリ全体で使われるものに使用します。(e.g. `ui.button`)

##### 構造

```
common	// 各所で使うもの(e.g.button)
├ site	// サイトに構築に関するもの(e.g. サイト名)
├ ui
│   └ button
└ form
    ├ [各要素]
     validations 
        └ [validator]
```

#### 名前空間:`glossary`

##### 用途

用語集。汎用的な言葉や定型文などに使用します。

##### 構造

```
glossary
├ words
└ phrase
```

#### 名前空間: `location`

##### 用途

国・地名。cscと同じ構造を目標とします。

##### 構造

```
location
```
