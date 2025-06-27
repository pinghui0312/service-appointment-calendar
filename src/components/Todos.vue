<script setup lang="ts">
import "@/assets/main.css";
import { onMounted, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

// create a reactive reference to the array of appointments
const appointments = ref<Array<Schema["Appointment"]["type"]>>([]);

const listAppointments = () => {
  client.models.Appointment.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      appointments.value = items;
    },
  });
};

const createAppointment = () => {
  client.models.Appointment.create({
    dentistName: "testing",
    equipment: "testing",
    notes: "testing",
  }).then(() => {
    // After creating a new appointment, update the list of appointments
    listAppointments();
  });
};

// fetch appointments when the component is mounted
onMounted(() => {
  listAppointments();
});
</script>

<template>
  <main>
    <h1>My appointments</h1>
    <button @click="createAppointment">+ new</button>
    <ul>
      <li v-for="appointment in appointments" :key="appointment.id">
        {{ appointment.notes }}
      </li>
    </ul>
    <div>
      🥳 App successfully hosted. Try creating a new appointment.
      <br />
      <a
        href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/"
      >
        Review next steps of this tutorial.
      </a>
    </div>
  </main>
</template>
