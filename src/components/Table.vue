<script setup lang="ts">
import { defineProps } from "vue";
import type { Schema } from "../../amplify/data/resource";

const props = defineProps({
    appointments: {
        default: [] as Array<Schema["Appointment"]["type"]>
    }
});

</script>

<template>
    <table className="w-full max-w-[1028px] border border-darkblue">
        <tbody>
            <tr v-if="props.appointments.length > 0" className="bg-darkblue">
                <th className="p-4 text-center">
                    <p className="text-white font-semibold">Dentist Name</p>
                </th>
                <th className="p-4 text-center">
                    <p className="text-white font-semibold">Appointment Time</p>
                </th>
                <th className="p-4 text-center rounded-tr-4"></th>
            </tr>
            <tr className="border-b border-b-darkblue" v-for="appointment in props.appointments" :key="appointment.id">
                <td className="p-4 text-center">
                    <p className="text-black">{{ appointment.dentistName }}</p>
                </td>
                <td className="p-4 text-center">
                    <p className="text-black">{{ appointment.dateTime }}</p>
                </td>
                <td className="p-4 text-center">

                </td>
            </tr>
        </tbody>
    </table>
</template>