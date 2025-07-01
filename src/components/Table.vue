<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { deleteAppointment } from "../../amplify/backend/functions";
import IconButton from "./IconButton.vue";
import { Dialog } from "primevue";
import AppointmentDetail from '../components/AppointmentDetail.vue';

type Appointment = Schema["Appointment"]["type"];
type TableProps = {
    appointments: Array<Appointment>;
    initList?: () => Promise<void>;
    userId: string;
};

const { appointments, initList, userId } = defineProps<TableProps>();
const visible = ref(false);
const selectedAppointment = ref<Appointment | undefined>(undefined);
const viewOnly = ref(false);

const onClickDelete = async (appointment: Appointment) => {
    const { id } = appointment;
    await deleteAppointment(id);
    if (initList) {
        await initList()
    }
};

const onClickEdit = (appointment: Appointment) => {
    selectedAppointment.value = appointment;
    viewOnly.value = false;
    visible.value = true;
};

const onClickView = (appointment: Appointment) => {
    selectedAppointment.value = appointment;
    viewOnly.value = true;
    visible.value = true;
};

// data lists
const headerList = ['Dentist Name', 'Appointment Time']
const iconButtonList = [
    { onClick: onClickView, icon: 'pi-eye' },
    { onClick: onClickEdit, icon: 'pi-pencil' },
    { onClick: onClickDelete, icon: 'pi-trash' },
]

const formatDateTime = (date: string) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toISOString().split("T")[0];
    const formattedTime = dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
};
</script>

<template>
    <table className="w-full max-w-[1028px] border border-darkblue">
        <tbody>
            <tr v-if="appointments.length > 0" className="bg-darkblue">
                <th v-for="header in headerList" className="p-4 text-center">
                    <p className="text-white font-semibold">{{ header }}</p>
                </th>
                <th className="p-4"></th>
            </tr>
            <tr className="border-b border-b-darkblue" v-for="appointment in appointments" :key="appointment.id">
                <td className="p-4 text-center">
                    <p className="text-black">{{ appointment.dentistName }}</p>
                </td>
                <td className="p-4 text-center">
                    <p className="text-black">
                        {{ formatDateTime(appointment.dateTime) }}
                    </p>
                </td>
                <td className="p-4 text-center">
                    <div className="flex flex-row gap-x-2 justify-end">
                        <IconButton v-for="button in iconButtonList" :onClick="() => button.onClick(appointment)"
                            :icon="button.icon" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Dialog className="w-full web:max-w-3/4 max-w-full mx-4 bg-white text-black" v-model:visible="visible" modal
        header="Appointment Details">
        <AppointmentDetail :userId="userId" :appointment="selectedAppointment" :viewOnly="viewOnly"
            :initList="initList" />
    </Dialog>
</template>
