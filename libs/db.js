const knex = require("knex")({  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    port: 3306,
    password: "",
    database: "fullstacknextjs",
  },
});

export default knex;
