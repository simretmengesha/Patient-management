<script lang="ts">
  import { navigate } from "svelte-routing";

  export let id: Number;
  export let cardNo: string;
  export let firstName: string;
  export let middleName: string;
  export let lastName: string;
  export let sex: string;
  export let birthDate: Date;
  export let phoneNumber: string;

  const openPatientUpdate = () => {
    navigate(`/patients/${id}`);
  };
</script>

<tr on:click={openPatientUpdate}>
  <td>APC-{cardNo}</td>
  <td>{firstName}</td>
  <td>{middleName}</td>
  <td>{lastName}</td>
  <td>{sex}</td>
  <td>{birthDate}</td>
  <td>{phoneNumber}</td>
</tr>

<style>
  td {
    border: 1px solid #232323;
    text-align: center;
  }
  tr:nth-child(even) {
    background-color: #84bc9c;
    color: #ffffff;
  }
  tr:hover {
    cursor: pointer;
  }
</style>
