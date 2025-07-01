<script setup lang="ts">
import {
    createAppointment,
    updateAppointment,
} from "../../amplify/backend/functions";
import { defineProps, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { DatePicker, Toast } from "primevue";
import { useToast } from "primevue/usetoast";
const toast = useToast();

type AppointmentDetailProps = {
    userId: string;
    appointment?: Schema["Appointment"]["type"];
    viewOnly?: boolean;
    initList?: () => Promise<void>;
}

const { userId = '', appointment, viewOnly = false, initList } = defineProps<AppointmentDetailProps>();

const dentistName = ref(appointment?.dentistName ?? '');
const equipment = ref(appointment?.equipment ?? '');
const dateTime = ref(appointment?.dateTime ? new Date(appointment?.dateTime) : new Date());
const notes = ref(appointment?.notes ?? '');
const isUpdateAction = appointment !== undefined;

const onClickSubmit = async () => {
    // switch functions based on actions to be done
    const performAction = isUpdateAction ? updateAppointment : createAppointment;
    const summary = isUpdateAction ? "Appointment Updated" : "Appointment Created";
    const detail = isUpdateAction ? "Appointment Updated successfully" : "Appointment created successfully";
    let params = {
        ...(isUpdateAction ? { id: appointment.id } : {}),
        dentistName: dentistName.value,
        equipment: equipment.value,
        notes: notes.value,
        technicianId: userId,
        dateTime: dateTime.value.toISOString(),
    };
    await performAction(params as Schema["Appointment"]["type"]);
    if (initList) {
        await initList()
    }
    toast.add({ severity: 'success', summary, detail, life: 3000 });
};
</script>

<template>
    <Toast />
    <form v-on:submit.prevent="onClickSubmit">
        <div className="flex tab:flex-row flex-col flex-1 items-center gap-4 flex-wrap">
            <div className="flex flex-col gap-y-1 w-full">
                <p className="font-semibold">Dentist Name*</p>
                <input :disabled='viewOnly' required className="border border-gray rounded-[8px] p-2"
                    v-model="dentistName" placeholder="Dentist Name" />
            </div>
            <div className="flex flex-col gap-y-1 tab:flex-[calc(50%-16px)] flex-1 w-full">
                <p className="font-semibold">Equipment*</p>
                <select :disabled='viewOnly' required className="border border-gray rounded-[8px] p-2"
                    v-model="equipment">
                    <option disabled value="">Please select one</option>
                    <option>Compressor</option>
                    <option>Suction Machine</option>
                    <option>Scanner</option>
                    <option>Hygiene Equipment</option>
                </select>
            </div>
            <div className="flex flex-col gap-y-1 tab:flex-[calc(50%-16px)] flex-1 w-full">
                <p className="font-semibold">Appointment Time*</p>
                <DatePicker :disabled='viewOnly' className="flex" v-model="dateTime" showTime hourFormat="12" fluid
                    placeholder="dateTime" :minDate="new Date()" />
            </div>
            <div className="flex flex-col gap-y-1 w-full">
                <p className="font-semibold">Notes</p>
                <textarea :disabled='viewOnly' className="border border-gray rounded-[8px] p-2" v-model="notes"
                    placeholder="Notes" />
            </div>
        </div>
        <div v-if="!viewOnly" className="flex flex-row justify-center mt-4">
            <button className="btn" type="submit">Submit</button>
        </div>
    </form>
</template>
