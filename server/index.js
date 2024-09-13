const express = require("express");
const app = express();
app.use(require("cors")());
app.use(express.json());

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./patients_db.db",
  },
  useNullAsDefault: true,
});

/* get all patients with optional parameter to get specific patients */
app.post("/patients", async (req, res) => {
  const { card_no, first_name, middle_name, last_name, limit, offset } =
    req.body;
  const searchQuery = {};
  searchQuery.first_name = first_name ? first_name + "%" : "%";
  searchQuery.middle_name = middle_name ? middle_name + "%" : "%";
  searchQuery.last_name = last_name ? last_name + "%" : "%";
  searchQuery.card_no = card_no ? card_no + "%" : "%";
  knex
    .select("*")
    .from("patients")
    .limit(limit ? limit : 100)
    .offset(offset ? offset : 0)
    .whereLike("first_name", searchQuery.first_name)
    .andWhereLike("middle_name", searchQuery.middle_name)
    .andWhereLike("last_name", searchQuery.last_name)
    .andWhereLike("card_no", searchQuery.card_no)
    .then((p) =>
      res.status(200).json({
        patients: p,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err.message,
      });
    });
  // .finally(() => knex.destroy());
});

app.get("/patients/:id", async (req, res) => {
  const { id } = req.params;
  knex
    .select("*")
    .from("patients")
    .limit(1)
    .where({
      id,
    })
    .then((p) =>
      res.status(200).json({
        patient: p[0],
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err.message,
      });
    });
});

app.put("/patients/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  knex("patients")
    .where({
      id,
    })
    .update({
      ...req.body,
    })
    .then((p) =>
      res.status(200).json({
        message: "successfully updated patient details",
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err.message,
      });
    });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
