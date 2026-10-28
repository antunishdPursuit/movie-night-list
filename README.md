# Movie Night

Movie Night began as a collaborative learning project built with React, Express, and PostgreSQL. This local refresh keeps the movie-list experience while making it easy to explore without rebuilding the original backend.

## Run the local demo

Use Node.js 24.15 or newer in the 24.x line (or Node.js 22.22.2 or newer in the 22.x line):

```sh
npm ci
npm start
```

Open the local address printed by Vite. Browse the sample movies, view details, and add, edit, or delete entries. The demo stores changes only in memory; refreshing the page resets the sample list. It does not connect to a database or submit information to a server. Sample poster URLs are external and unavailable images show a fallback.

```sh
npm test
npm run build
```

The original backend remains in the [moviesBackEnd repository](https://github.com/antunishdPursuit/moviesBackEnd) as historical reference. Its old deployment and database setup are not required for this demo. Do not run the original database initialization against an existing database: it drops and recreates a database.

The original application was collaborative: Dennis worked on routing, forms, API integration, setup, and deployment, and Angel Tirado contributed frontend styling and backend CRUD work. This refresh revisits the earlier learning project with AI assistance.
