<script setup lang="ts">
import { onMounted, ref, defineProps } from "vue";
import { getAppointmentList, deleteAppointment } from "../../amplify/backend/functions";
import type { Schema } from "../../amplify/data/resource";
import Table from '../components/Table.vue';
import AppointmentDetail from '../components/AppointmentDetail.vue';

const props = defineProps({
  userId: {
    default: ""
  }
});

// create a reactive reference to the array of appointments
const appointments = ref<Array<Schema["Appointment"]["type"]>>([]);
const nextToken = ref<string | null | undefined>(undefined);
const lastTokenList = ref<Array<string | null | undefined>>([])
const selectedAppointment = ref<Schema["Appointment"]["type"] | undefined>(undefined)

const initAppointmentList = async () => {
  // update the list right after a new appointment is created
  lastTokenList.value = [undefined]
  const { data, nextPageToken } = await getAppointmentList(undefined, props.userId);
  appointments.value = data;
  nextToken.value = nextPageToken;
}

const getPreviousList = async () => {
  lastTokenList.value = lastTokenList.value.slice(0, -1);
  const { data, nextPageToken } = await getAppointmentList(lastTokenList.value[lastTokenList.value.length - 1], props.userId);
  appointments.value = data;
  nextToken.value = nextPageToken;
}

const getNextList = async () => {
  if (!lastTokenList.value.includes(nextToken.value)) {
    lastTokenList.value = [...lastTokenList.value, nextToken.value]
  }
  const { data, nextPageToken } = await getAppointmentList(nextToken.value, props.userId);
  appointments.value = data;
  nextToken.value = nextPageToken;
}

const onClickDelete = (id: string) => {
  deleteAppointment(id).then(async () => await initAppointmentList());
};

// fetch appointments when the component is mounted
onMounted(async () => {
  await initAppointmentList();
});
</script>

<template>
  <section className="flex flex-col items-center w-full gap-y-8">
    <h1 className="text-black">My appointments</h1>
    <Table :appointments="appointments" />
    <div className="flex flex-row gap-x-8 items-center">
      <button :disabled="lastTokenList.length <= 1" className="p-2 btn" @click="getPreviousList">
        < </button>
          <p className="text-black">Page {{ lastTokenList.length }}</p>
          <button :disabled="nextToken === null" className="p-2 btn" @click="getNextList">
            >
          </button>
    </div>
  </section>
  <AppointmentDetail :userId="props.userId" :appointment="selectedAppointment" />
</template>
