---
title: "Naming Convention for i18n Key"
---
# i18n Keyの命名規則
## 予約文字
|予約文字|用途|
|---|---|
|.|keySeparator|
|:|nsSeparator|
|_|pluralSeparator|
|_|contextSeparator|

## 命名規則
- ケバブケースを利用
- 子が複数になる場合(配列など)、親のキーは複数形を使用(eg. messages)
### 名前空間:`app`
#### 用途
各containerや各componentsで使われるものを使用

#### 構造
```
app
├ containers	// 各containerで使うもの
│   └ [各container]  // ex. home
└ components	// 各componentで使うもの
    ├ [各component]
```
#### 使用例
例、`home` componentのtitleを設定する場合


```
// ./src/locales/ja/app.json
{
  "components": {
    "home": {
      "title": "タイトル"
    }
  }
}
```
### 名前空間:`common`
#### 用途
アプリ全体で使われるものに使用(eg. ui.buttonなど)
#### 構造
```
common	// 各所で使うもの(ex.button)
├ site	// サイトに構築に関するもの(ex. サイト名)
├ ui
│   └ button
└ form
    ├ [各要素]
     validations 
        └ [validator]
```
### 名前空間:`glossary`
#### 用途
#### 構造
```
glossary
├ words
└ phrase
```
### 名前空間: `location`
#### 用途
国・地名を。cscと同じ構造を目標
#### 構造
```
location
```