# ETH-Activity-BE

## Description :open_book:	

An Ethereum visualizer to allow users to see the different trends that appear on the platform. Many new users struggle with the adoption of Ethereum, and it could be caused by the lack of visibility to see how other users interact with Ethereum. ETH-Activity attempts to solve this problem by giving visualizations on the current trends of Ethereum to allow new users spend their Ethereum on a platform that they trust.

## Application Run-down :mag_right:	

ETH-Activity BE utilizes the framework NestJS to handle requests to read / write to the PostgreSQL database. NestJS is built ontop of Express and provides good boilerplate code to allow the application to run fast and smoothly. To handle database operations, ETH-Activity BE uses TypeORM. Using TypeORM allows us to write the schema with object oriented principles and write effective queries against the database.

## Installation :bulb:	

Make sure to have a PostgreSQL database running locally on port 5432 with the name of the database as "ethactivity"

```bash
$ yarn
```

## Running the app :running:	

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Endpoints

- **URL: /transactions**

  - Method: **GET**
  - Optional Filter Parameters
    Limit: number of transactions to fetch

    Offset: start index of fetch

    Block: a number for which all transactions from the block will be returned

    Address: hash value or string in which all transactions that include the address will be returned

    Timeline: specified by 1,3,5, and 30. Displays transactions between now and the timeline specified

  - Success:
    - Code: 200
    - Response: List of Transactions
  - Error:
    - Code: 500
    - Response: Internal Server Error

- **URL: /addresses**

  - Method: **GET**
  - Optional Filter Parameters
    Limit: number of addresses to fetch

    Hash: hash value or string in which all transactions including the hash will be returned

  - Success:
    - Code: 200
    - Response: List of objects where each contains id of address, hash value and array of Transactions associated with that address
  - Error:
    - Code: 500
    - Response: Internal Server Error

- **URL: /blocks**

  - Method: **GET**
  - Optional Filter Parameters
    Limit: number of blocks to fetch

    Block: Filter by the block number

  - Success:
    - Code: 200
    - Response: List of objects where each contains id of block, blockNumber and array of Transactions associated with that block
  - Error:
    - Code: 500
    - Response: Internal Server Error

## License

ETH-Activity BE is [MIT licensed](LICENSE).
