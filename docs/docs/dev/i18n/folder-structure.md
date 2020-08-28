---
id: i18n-folder-structure
title: Folder Structure
sidebar_label: Folder Structure
---

## フォルダ構造について

### 翻訳ファイルの場所

翻訳ファイルは `/src/locales/{{locale}}/{{namespace}}.json` に生成されます。

ディレクトリ構造は以下の通りです。

```
.
└── src
    └── locales
        ├── index.js
        ├── en  // Locale:en の翻訳フォルダ
        │       ├── index.js
        │       ├── app.json
        │       ├── common.json
        │       ├── glossary.json
        │       └── location.json
        └── ja  // Locale:ja の翻訳フォルダ
            ├── index.js
            ├── app.json
            ├── common.json
            ├── glossary.json
            └── location.json
```

例えば「Localeが`en`、名前空間が`common`」の翻訳ファイルは`./src/locales/en/common.json`に存在します。
