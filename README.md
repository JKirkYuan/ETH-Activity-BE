# ETH-Activity-BE

## Description

An Ethereum visualizer to allow users to see the different trends that appear on the platform. Many new users struggle with the adoption of Ethereum, and it could be caused by the lack of visibility to see how other users interact with Ethereum. ETH-Activity attempts to solve this problem by giving visualizations on the current trends of Ethereum to allow new users spend their Ethereum on a platform that they trust.

## Application Run-down

ETH-Activity BE utilizes the framework NestJS to handle requests to read / write to the PostgreSQL database. NestJS is built ontop of Express and provides good boilerplate code to allow the application to run fast and smoothly. To handle database operations, ETH-Activity BE uses TypeORM. Using TypeORM allows us to write the schema with object oriented principles and write effective queries against the database.

## Installation

Make sure to have a PostgreSQL database running locally on port 5432 with the name of the database as "ethactivity"

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## License

ETH-Activity BE is [MIT licensed](LICENSE).
