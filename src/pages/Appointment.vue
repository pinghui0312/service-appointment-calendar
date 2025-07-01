<script setup lang="ts">
import { onMounted, ref, defineProps } from "vue";
import { getAppointmentList } from "../../amplify/backend/functions";
import type { Schema } from "../../amplify/data/resource";
import Table from "../components/Table.vue";
import AppointmentDetail from "../components/AppointmentDetail.vue";
import { Dialog } from "primevue";
import IconButton from "../components/IconButton.vue";

type AppointmentProps = {
  userId: string;
};

const props = defineProps<AppointmentProps>();

// create a reactive reference to the array of appointments
const appointments = ref<Array<Schema["Appointment"]["type"]>>([]);
const selectedAppointment = ref<Schema["Appointment"]["type"] | undefined>(
  undefined
);
const visible = ref<boolean>(false);

const initAppointmentList = async () => {
  // update the list right after making amendments on appointments
  const { data } = await getAppointmentList(props.userId);
  appointments.value = data;
};

const onClickOpenDialog = () => {
  visible.value = true;
};

// fetch appointments when the component is mounted
onMounted(async () => {
  await initAppointmentList();
});
</script>

<template>
  <section
    className="flex flex-col items-center w-full max-w-[1440px] px-4 gap-y-8"
  >
    <h1>My appointments</h1>
    <div className="flex flex-col gap-y-4 w-full max-w-[1028px] items-center">
      <div className="tab:flex hidden flex-row w-full justify-end">
        <button className="btn tab:block hidden" @click="onClickOpenDialog">
          Add New
        </button>
      </div>
      <Table
        :appointments="appointments"
        :initList="initAppointmentList"
        :userId="userId"
      />
    </div>
    <IconButton
      className="fixed tab:hidden block bottom-[16px] left-[16px]"
      :onClick="onClickOpenDialog"
      :icon="'pi-plus'"
    />
  </section>
  <Dialog
    className="w-full web:max-w-3/4 max-w-full mx-4 bg-white text-black"
    v-model:visible="visible"
    modal
    header="Appointment Details"
  >
    <AppointmentDetail
      :userId="props.userId"
      :appointment="selectedAppointment"
      :initList="initAppointmentList"
    />
  </Dialog>
</template>
