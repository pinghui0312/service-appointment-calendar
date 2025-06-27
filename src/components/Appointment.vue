<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAppointmentList, createAppointment, updateAppointment, deleteAppointment } from "../functions";

// create a reactive reference to the array of appointments
const appointments = ref<Array<Schema["Appointment"]["type"]>>([]);

const onClickCreate = () => {
  const appointment = {
    dentistName: "dentistName",
    equipment: "equipment",
    notes: "notes",
  };
  createAppointment(appointment).then(() => {
    // update the list right after a new appointment is created
    getAppointmentList(appointments);
  });
};

const onClickDelete = (id: string) => {
  deleteAppointment(id).then(() => {
    // update the list right after an appointment is deleted
    getAppointmentList(appointments);
  });
};

const onClickEdit = (id: string) => {
    const appointment = {
    dentistName: "editeddentist",
    equipment: "editedequipment",
    notes: "editednotes",
  };
  updateAppointment({id, ...appointment}).then(() => {
    // update the list right after updating an appointment
    getAppointmentList(appointments);
  });
  
};

// fetch appointments when the component is mounted
onMounted(() => {
  getAppointmentList(appointments);
});
</script>

<template>
  <main>
    <h1 className="m-20">My appointments</h1>
    <button @click="onClickCreate">+ new</button>
    <ul>
      <li v-for="appointment in appointments" :key="appointment.id">
        <input>{{ appointment.notes }}</input>
        <button className="p-2" @click="onClickEdit(appointment.id)">
          Edit
        </button>
        <button className="p-2" @click="onClickDelete(appointment.id)">
          Delete
        </button>
      </li>
    </ul>
  </main>
</template>
