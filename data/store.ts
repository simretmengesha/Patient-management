import { writable, type Writable } from "svelte/store";
import type { PatientData } from "../helpers/index";

export const patients: Writable<Array<PatientData>> = writable([]); // patients store
export const initPatients: Writable<Array<PatientData>> = writable([]); // initial patients store
export const patientUpdate: Writable<PatientData | undefined> =
  writable(undefined);
export const current_offset: Writable<Number> = writable(0);
