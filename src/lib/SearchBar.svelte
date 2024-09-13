<script lang="ts">
  import { initPatients, patients } from "../../data/store";

  let first_name: string;
  let middle_name: string;
  let last_name: string;
  let card_no: string;

  /* handles form submission */
  const handleSubmit = () => {
    /* checks for at least one field to be filled */
    if (!first_name && !middle_name && !last_name && !card_no) {
      window.alert("Please enter at least one field");
      return;
    }
    /* fetches from server based on the search params */
    fetch("http://localhost:3000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, middle_name, last_name, card_no }),
    })
      .then((r) => r.json())
      .then((p) => {
        patients.set(p.patients);
      })
      .catch((err) => console.log(err));
  };
  /* set patients to initially loaded patients from db */
  const handleClear = () => {
    patients.set($initPatients);
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" placeholder="Card No." bind:value={card_no} />
  <input type="text" placeholder="First Name" bind:value={first_name} />
  <input type="text" placeholder="Middle Name" bind:value={middle_name} />
  <input type="text" placeholder="Last Name" bind:value={last_name} />
  <button class="submit-btn" type="submit">Search</button>
  <button class="clear-btn" type="reset" on:click={handleClear}>Clear</button>
</form>

<style>
  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 2em;
  }

  input {
    width: 20%;
  }

  button {
    height: 31px;
    width: 10%;
    color: #ffffff;
    border-radius: 0;
  }
</style>
