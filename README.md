## Overview

Sample application to create a canvassing app. Stopped at around 4 hours

The app is deployed, please view the application here: https://empower-takehome-production-0037.up.railway.app

## Getting Started

First, make sure mysql is installed and running

```
brew install mysql
brew services start mysql
```

Then, run the db-init command to initalize the db and seed the data

```
make init-db
```

Finally, start the server

```
make dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features implemented

1. List of Notes
2. Create a Note
3. Added additional fields such as contact name, canvasser, etc.
4. Added email field with some regex validation
5. For ease of querying the db, it uses Prisma to easily query the data from the DB
6. Deployed to a free tier server

## Testing

To run the tests for this project run the following command:

```
make test
```

## Where AI was used

-  To create the seed data
-  The initial scaffolding of the tests

All else was written by me
