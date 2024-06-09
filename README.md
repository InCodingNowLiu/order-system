## Pre-requisites

Node.js >= 18 and running instances of a MongoDB server are required for the app to start.

Docker is required for running tests, make sure it is running if you want to run the tests.

## Setup CouchDB in local environment

```
docker pull couchdb

docker run -d --name couchdb -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=admin -p 5984:5984 couchdb

```

## Setup MongoDB in local environment

```
mongod -f mongo.config
```

## Installation

```
npm install
or
pnpm install

npm start
```

## Models

This app has the following models:

1. `User` - representing the users of the system.
2. `Reservation` - guest and Restaurant employees reservation

## Resolvers

Resolvers expose Graphql Schema for interacting with the models and more.

In this app, there are two resolvers:

1. `reservation` - resolver for guest and Restaurant employees to do reservation operation
2. `user` - resolver for creating user, fetching user info,
   updating user info, and logging in.

## Apps

order-system-server: graphql server which use nodejs and loopback

how to start:

```
npm start
```

reservation-app: A SPA(Single Page Application) which use reactjs to interact with the backend and show how the API works.
how to start:

```
npm start
```
