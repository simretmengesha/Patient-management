<script lang="ts">
  import Patient from "./Patient.svelte";
  import SearchBar from "./SearchBar.svelte";
  import { patients, initPatients } from "../../data/store";
  import { onMount } from "svelte";

  let limit: Number = 100;
  let offset: Number = 0;

  /* fetches patients from db on component mount */
  onMount(() => {
    fetch("http://localhost:3000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit, offset }),
    })
      .then((r) => r.json())
      .then((p): void => {
        patients.set(p.patients);
        initPatients.set(p.patients);
      })
      .catch((err): void => {
        console.log(err);
        alert(err.message);
      });
  });
</script>

<div>
  <SearchBar></SearchBar>
  <div id="table-container">
    <table>
      <thead>
        <tr>
          <th>Card No.</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Sex</th>
          <th>Birth Date</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {#each $patients as p}
          <Patient
            id={p.id}
            cardNo={p.card_no}
            firstName={p.first_name}
            middleName={p.middle_name}
            lastName={p.last_name}
            sex={p.sex}
            birthDate={p.birthdate}
            phoneNumber={p.phone_number}
          />
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  div {
    width: 75%;
    display: flex;
    flex-direction: column;
  }
  table {
    border-collapse: collapse;
  }
  th {
    border: 1px solid #232323;
  }
  div#table-container {
    height: 500px;
    overflow: auto;
    width: 100%;
  }
  /*   tbody,
  thead {
    display: block;
  }
  tbody {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  } */
</style>
