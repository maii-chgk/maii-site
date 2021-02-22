module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri: env("DATABASE_URI"),
        database: "oz",
      },
      options: {
        ssl: true,
      },
    },
  },
});
