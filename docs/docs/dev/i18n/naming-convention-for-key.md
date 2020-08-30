---
id: i18n-naming-convention-for-key
title: Naming Convention for i18n Key
sidebar_label: Naming Convention for i18n Key
---

## 命名規則

### 予約文字

|予約文字|用途|
|---|---|
|.|keySeparator|
|:|nsSeparator|
|_|pluralSeparator|
|_|contextSeparator|

### 命名規則

- ケバブケースを使用。
  - e.g. `common:sample.this-is-sample-key`
- 子が複数になる場合(配列など)は、親のキーは複数形を使用
  - e.g. `messages`

### 備考

- ケバブケースからキャメルケースへの移行が検討されています。
