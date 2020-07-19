# furport-front

The front-end repository of [FurPort](https://www.furport.tk/).

[![Deploy](https://github.com/lapi-hotel-group/furport-front/workflows/Deploy/badge.svg)](https://github.com/lapi-hotel-group/furport-front/actions?query=workflow%3ADeploy)
[![Lint](https://github.com/lapi-hotel-group/furport-front/workflows/Lint/badge.svg)](https://github.com/lapi-hotel-group/furport-front/actions?query=workflow%3ALint)

### Prerequisites

- nodejs
- npm

### Installing

First, install node dependencies.

```
npm install
```

Copy `.env.sample` and make `.env` file. Set the appropriate environment variables by editing `.env` file.

```
cp .env.sample .env
```

And run development server by following command.

```
npm start
```

Then you can access website. (i.e. http://localhost:3000)

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

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/lapi-hotel-group/furport-front/tags).

## Authors

- **Lapi（るりいろ）** - [dragoneena12](https://github.com/dragoneena12)

See also the list of [contributors](https://github.com/lapi-hotel-group/furport-front/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
