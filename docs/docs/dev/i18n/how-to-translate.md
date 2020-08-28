---
id: i18n-how-to-translate
title: How to translate
sidebar_label: How to translate
---

## 翻訳の進め方

### 使用するなんとか

FurPortでは主に`react-i18next`の`useTranslation`(hook)を用いた翻訳を行います。
使い方については[react-i18next/useTranslation (hook)](https://react.i18next.com/latest/usetranslation-hook) をご覧ください。

#### 方針

- 原則として利用時には名前空間を明示してください。(e.g. `t("common:site.title")`)

#### タグの内挿を行わない場合

通常はuseTranslation (hook) を使用してください。

##### コード例

翻訳ファイル

`./src/locales/ja/common.json`
```JSON
{
  "containers": {
    "app": {
      "title": "タイトルの翻訳結果"
    }
  }
}
```

実行ファイル
```typescript jsx
import React from 'react'
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("common:containers.app.title")}</h1>
    </>
  )
}
```

#### タグの内挿を行う場合 (e.g. リンクの挿入)

Trans Componentを用います。
上記のuseTranslation (hook)で実現できない場合のみこちらの方法を用いてください。(e.g. リンクの挿入)

##### コード例

翻訳ファイル

`./src/locales/ja/app.json`
```JSON
{
  "component": {
    "app": {
      "sample-link": "こちらは<linkToExampleUrl>サンプルリンク</linkToExampleUrl>です。"
    }
  }
}
```

実行ファイル
```typescript jsx
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography display="inline" variant="body2">
        <Trans
          i18nKey="app:components.app.sample-link"
          components={{
            linkToExamleUrl: (
              <a
                href="https://example.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                }}
              />
            ),
          }}
        />
      </Typography>
    </>
  )
}
```
