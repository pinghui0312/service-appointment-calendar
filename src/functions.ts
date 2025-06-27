import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { type Ref } from "vue";

const client = generateClient<Schema>();

const getAppointmentList = (
  appointments: Ref<Array<Schema["Appointment"]["type"]>>
) => {
  client.models.Appointment.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      appointments.value = items;
    },
  });
};

const createAppointment = (appointment: Schema["Appointment"]["type"]) => {
  const { dentistName, equipment, notes } = appointment;
  return client.models.Appointment.create({
    dentistName,
    equipment,
    notes,
  });
};

const deleteAppointment = (id: string) => {
  return client.models.Appointment.delete({
    id,
  });
};

const updateAppointment = (appointment: Schema["Appointment"]["type"]) => {
  const { dentistName, equipment, notes, id } = appointment;
  return client.models.Appointment.update({
    id,
    dentistName,
    equipment,
    notes,
  });
};

export {
  createAppointment,
  getAppointmentList,
  updateAppointment,
  deleteAppointment,
};
