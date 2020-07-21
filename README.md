# furport-front

The front-end repository of [FurPort](https://www.furport.tk/).

[![Deploy](https://github.com/lapi-hotel-group/furport-front/workflows/Deploy/badge.svg)](https://github.com/lapi-hotel-group/furport-front/actions?query=workflow%3ADeploy)
[![Lint](https://github.com/lapi-hotel-group/furport-front/workflows/Lint/badge.svg)](https://github.com/lapi-hotel-group/furport-front/actions?query=workflow%3ALint)

## 前提条件

- nodejs / npm

## インストール

最初に、node 依存パッケージをインストールします。

```
npm install
```

`.env.sample` ファイルをコピーして `.env` ファイルを作成します。`.env` ファイルを編集して適切な環境変数を設定してください。

```
cp .env.sample .env
```

最後に次のコマンドで開発サーバーを起動してください。

```
npm start
```

以上で開発サーバーにアクセスできます。 (たとえば http://localhost:3000)

### コーディングスタイルテスト

次のコマンドで ESLint と Prettier を起動できます。一部のエラーは自動修正できます。
コミットする前にすべてのテストを通過する必要があります。

```
npm run lint
```

## Built With

- [React](https://reactjs.org/) - ウェブフレームワーク
- [Create React App](https://create-react-app.dev/) - 初期セットアップ
- [Material-UI](https://material-ui.com/) - UI フレームワーク
- [react-i18next](https://react.i18next.com/) - 多言語対応
- [Recharts](https://recharts.org/) - 図の描画

## Contributing

行動規範やプルリクエストの手順の詳細については[CONTRIBUTING.md](CONTRIBUTING.md) と [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) をご覧ください。

## License

このプロジェクトは MIT ライセンスに基づいています。詳細は [LICENSE.md](LICENSE.md) ファイルをご覧ください。

---

## Prerequisites

- nodejs
- npm

## Installing

First, install node dependencies.

```
npm install
```

Copy `.env.sample` and make `.env` file. Set the appropriate environment variables by editing `.env` file.

```
cp .env.sample .env
```

Finally run development server by following command.

```
npm start
```

Then you can access development server. (i.e. http://localhost:3000)

### coding style tests

Following command runs ESLint and Prettier. They can auto-fix some errors.
You must pass all tests before commit.

```
npm run lint
```

## Built With

- [React](https://reactjs.org/) - The web framework
- [Create React App](https://create-react-app.dev/) - Initial setup
- [Material-UI](https://material-ui.com/) - The UI framework
- [react-i18next](https://react.i18next.com/) - i18n
- [Recharts](https://recharts.org/) - Drawing charts

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
