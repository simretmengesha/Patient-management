import knx from "knex";
import data from "./data/patients.json" assert { type: "json" };

const knex = knx({
  client: "sqlite3",
  connection: {
    filename: "./patients.db",
  },
  useNullAsDefault: true,
});

let patients = [];

await knex
  .select("*")
  .from("patients")
  .then((res) => {
    patients = patients.concat(res);
    return patients;
  })
  .then(() => knex.destroy())
  .catch((err) => console.log(err));

const insert = () => {
  knex
    .batchInsert("patients", data, 10)
    .returning("id")
    .then((id) => console.log(id))
    .then(() => knex.destroy())
    .catch((err) => console.log(err.message));
};

console.log(patients);
