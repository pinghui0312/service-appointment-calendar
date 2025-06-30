<script setup lang="ts">
import {
  createAppointment,
  updateAppointment,
} from "../../amplify/backend/functions";
import { defineProps, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { Dialog, DatePicker } from "primevue";

const props = defineProps({
  userId: {
    default: "",
  },
  appointment: {
    default: undefined as Schema["Appointment"]["type"] | undefined,
  },
});

const dentistName = ref("");
const equipment = ref("");
const dateTime = ref(new Date());
const notes = ref("");
const visible = ref(false);
const isUpdateAction = props.appointment !== undefined;

const onClickSubmit = () => {
  const performAction = isUpdateAction ? updateAppointment : createAppointment;
  let params = {
    ...(isUpdateAction ? { id: props.appointment.id } : {}),
    dentistName: dentistName.value,
    equipment: equipment.value,
    notes: notes.value,
    technicianId: props.userId,
    dateTime: dateTime.value.toISOString(),
  };
  performAction(params as Schema["Appointment"]["type"]);
};

const onClickOpen = () => {
  visible.value = true;
};
</script>

<template>
  <button className="btn" @click="onClickOpen">New</button>
  <Dialog
    className="w-full web:max-w-3/4 max-w-full mx-4 bg-white text-black"
    v-model:visible="visible"
    modal
    header="Appointment Details"
  >
    <form v-on:submit.prevent="onClickSubmit">
      <div
        className="flex tab:flex-row flex-col flex-1 items-center gap-4 flex-wrap"
      >
        <div className="flex flex-col gap-y-1 w-full">
          <p className="font-semibold">Dentist Name*</p>
          <input
            required
            className="border border-gray rounded-[8px] p-2"
            v-model="dentistName"
            placeholder="Dentist Name"
          />
        </div>
        <div
          className="flex flex-col gap-y-1 tab:flex-[calc(50%-16px)] flex-1 w-full"
        >
          <p className="font-semibold">Equipment*</p>
          <select
            required
            className="border border-gray rounded-[8px] p-2"
            v-model="equipment"
          >
            <option disabled value="">Please select one</option>
            <option>Compressor</option>
            <option>Suction Machine</option>
            <option>Scanner</option>
            <option>Hygiene Equipment</option>
          </select>
        </div>
        <div
          className="flex flex-col gap-y-1 tab:flex-[calc(50%-16px)] flex-1 w-full"
        >
          <p className="font-semibold">Appointment Time*</p>
          <DatePicker
            className="flex"
            v-model="dateTime"
            showTime
            hourFormat="12"
            fluid
            placeholder="dateTime"
          />
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <p className="font-semibold">Notes</p>
          <textarea
            className="border border-gray rounded-[8px] p-2"
            v-model="notes"
            placeholder="Notes"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center mt-4">
        <button className="btn" type="submit">Submit</button>
      </div>
    </form>
  </Dialog>
</template>
