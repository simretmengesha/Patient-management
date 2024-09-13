<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  export let id: string;
  let card_no: string;
  let first_name: string;
  let middle_name: string;
  let last_name: string;
  let birthdate: Date;
  let sex: string;
  let phone_number: string;

  onMount(() => {
    fetch(`http://localhost:3000/patients/${id}`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((p) => {
        ({
          card_no,
          first_name,
          middle_name,
          last_name,
          birthdate,
          sex,
          phone_number,
        } = p.patient);
      })
      .catch((err): void => {
        console.log(err);
        alert(err.message);
      });
  });

  const handleSubmit = () => {
    fetch(`http://localhost:3000/patients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_no,
        first_name,
        middle_name,
        last_name,
        birthdate,
        sex,
        phone_number,
      }),
    })
      .then((r) => r.json())
      .then((p) => {
        if (p.message) {
          alert(p.message);
          navigate("/");
        } else {
          alert(p.error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h1>Update Information for APC-{card_no}</h1>
  <label>
    Card No.:<br />
    <input type="text" bind:value={card_no} />
  </label>
  <label>
    First Name:<br />
    <input type="text" bind:value={first_name} />
  </label>
  <label>
    Middle Name:<br />
    <input type="text" bind:value={middle_name} />
  </label>
  <label>
    Last Name:<br />
    <input type="text" bind:value={last_name} />
  </label>
  <label>
    Sex:<br />
    <select bind:value={sex}>
      <option value="M">M</option>
      <option value="F">F</option>
    </select>
  </label>
  <label>
    BirthDate (mm/dd/yyyy):<br />
    <input
      type="date"
      max={new Date().toLocaleDateString("fr-ca")}
      bind:value={birthdate}
    />
  </label>
  <label>
    Phone Number:<br />
    <input type="tel" bind:value={phone_number} />
  </label>
  <button class="submit-btn" type="submit">Update</button>
</form>

<style>
  form {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
  }
  label {
    /* background-color: aqua; */
    align-self: flex-start;
    width: 100%;
  }
  input {
    width: 100%;
  }
  button {
    width: 100%;
    height: 2rem;
    color: white;
  }
</style>
