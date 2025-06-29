<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAppointmentList, createAppointment, updateAppointment, deleteAppointment } from "../../amplify/backend/functions";
import type { Schema } from "../../amplify/data/resource";

// create a reactive reference to the array of appointments
const appointments = ref<Array<Schema["Appointment"]["type"]>>([]);
const nextToken = ref<string | null | undefined>(undefined);
const lastTokenList = ref<Array<string | null | undefined>>([])

const initAppointmentList = async() => {
    // update the list right after a new appointment is created
    lastTokenList.value = [undefined]
    const { data, nextPageToken } = await getAppointmentList(undefined);
    appointments.value = data;
    nextToken.value = nextPageToken;
}

const getPreviousList = async() => {
  lastTokenList.value = lastTokenList.value.slice(0,-1);
  const { data, nextPageToken } = await getAppointmentList(lastTokenList.value[lastTokenList.value.length - 1]);
  appointments.value = data;
  nextToken.value = nextPageToken;
}

const getNextList = async() => {
  if (!lastTokenList.value.includes(nextToken.value)) {
    lastTokenList.value = [...lastTokenList.value, nextToken.value]
  }
  const { data, nextPageToken } = await getAppointmentList(nextToken.value);
  appointments.value = data;
  nextToken.value = nextPageToken;
}

const onClickCreate = () => {
  const appointment = {
    dentistName: "dentistName",
    equipment: "equipment",
    notes: "notes",
  };

  createAppointment(appointment as Schema["Appointment"]["type"]).then();
};

const onClickDelete = (id: string) => {
  deleteAppointment(id).then(async () => await initAppointmentList());
};

const onClickEdit = (id: string) => {
    const appointment = {
    dentistName: "editeddentist",
    equipment: "editedequipment",
    notes: "editednotes",
  };
  updateAppointment({id, ...appointment} as Schema["Appointment"]["type"]).then(async () => await initAppointmentList());
};

// fetch appointments when the component is mounted
onMounted(async() => {
  await initAppointmentList();
});
</script>

<template>
  <section className="flex flex-col items-center w-full">
    <h1 className="">My appointments</h1>
    <button @click="onClickCreate">+ new</button>
    <ul>
      <li v-for="appointment in appointments" :key="appointment.id">
        <input>{{ appointment.notes }}</input>
        <button className="p-2 outlined-btn" @click="onClickEdit(appointment.id)">
          Edit
        </button>
        <button className="p-2 btn" @click="onClickDelete(appointment.id)">
          Delete
        </button>
      </li>
    </ul>
    <div className="flex flex-row gap-x-8 items-center pt-8">
      <button :disabled="lastTokenList.length <= 1" className="p-2 btn" @click="getPreviousList">
           <
      </button>
      <p>Page {{ lastTokenList.length }}</p>
      <button :disabled="nextToken === null" className="p-2 btn" @click="getNextList">
           >
      </button>
    </div>
  </section>
</template>
