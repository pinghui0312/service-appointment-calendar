<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { deleteAppointment } from "../../amplify/backend/functions";
import { Dialog, Toast, DataTable, Column, Button, Menu } from "primevue";
import AppointmentDetail from '../components/AppointmentDetail.vue';
import { useToast } from "primevue/usetoast";
const toast = useToast();

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
const menu = ref();

const onClickDelete = async (appointment: Appointment) => {
    const { id } = appointment;
    await deleteAppointment(id);
    if (initList) {
        await initList()
    }
    toast.add({ severity: 'success', summary: 'Appointment Deleted', detail: 'Appointment Deleted Successfully', life: 3000 });
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

const toggle = (event: MouseEvent) => {
    menu.value.toggle(event);
};

// format date for display
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
    <Toast />
    <DataTable showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows className="w-full"
        :value="appointments" tableStyle="width: 100%">
        <Column field="dentistName" header="Dentist Name" sortable></Column>
        <Column field="dateTime" header="Appointment Time" sortable>
            <template #body="slotProps">
                {{ formatDateTime(slotProps.data.dateTime) }}
            </template>
        </Column>
        <Column>
            <template #body="{ data }">
                <div className="flex tab:flex-row flex-col gap-2">
                    <Button icon="pi pi-eye" rounded severity="contrast" @click="onClickView(data)" />
                    <Button icon="pi pi-pencil" rounded severity="contrast" @click="onClickEdit(data)" />
                    <Button icon="pi pi-trash" rounded severity="contrast" @click="onClickDelete(data)" />
                </div>
            </template>
        </Column>
    </DataTable>
    <Dialog className="w-full web:max-w-3/4 max-w-full mx-4 bg-white text-black" v-model:visible="visible" modal
        header="Appointment Details">
        <AppointmentDetail :userId="userId" :appointment="selectedAppointment" :viewOnly="viewOnly"
            :initList="initList" />
    </Dialog>
</template>
