<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import PatientsTable from "./lib/PatientsTable.svelte";
  import PatientUpdate from "./lib/PatientUpdate.svelte";
</script>

<main>
  <Router>
    <Route path="/">
      <PatientsTable />
    </Route>
    <Route path="/patients/:id" let:params>
      <PatientUpdate id={params.id} />
    </Route>
  </Router>
</main>

<style>
  main {
    width: 100%;
    /* background-color: aquamarine; */
    display: flex;
    justify-content: center;
  }
</style>
