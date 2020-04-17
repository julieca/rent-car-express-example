const host = process.env.DB_HOST || 'localhost:27017';

export default {
  server: {
    port: 9000,
    bodyLimit: "100kb"
  },
  database: {
    url: `mongodb://${host}/express-api`,
    properties: {
      promiseLibrary: global.Promise,
      useNewUrlParser: true
    }
  },
  key: {
    tokenExpireInMinutes: 1440
  }
}