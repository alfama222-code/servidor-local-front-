import gql from "graphql-tag";
import nysql from "mysql2/promise";

const db = nysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "servidor_local",
});
export default db;


