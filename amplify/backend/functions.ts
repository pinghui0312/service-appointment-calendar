import type { Schema } from "../data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

const getAppointmentList = async (
  nextToken: string | null | undefined,
  userId: string
) => {
  const {
    data: appointments,
    nextToken: nextPageToken,
    // Repeat this API call with the nextToken until the returned nextToken is `null`
  } = await client.models.Appointment.listAppointmentByTechnicianIdAndDateTime({
    technicianId: userId,
  });
  return { data: appointments, nextPageToken };
};

const createAppointment = (appointment: Schema["Appointment"]["type"]) => {
  const { dentistName, equipment, notes, technicianId, dateTime } = appointment;
  return client.models.Appointment.create({
    dentistName,
    equipment,
    notes,
    technicianId,
    dateTime,
  });
};

const deleteAppointment = (id: string) => {
  return client.models.Appointment.delete({
    id,
  });
};

const updateAppointment = (appointment: Schema["Appointment"]["type"]) => {
  const { dentistName, equipment, notes, id, dateTime } = appointment;
  return client.models.Appointment.update({
    id,
    dentistName,
    equipment,
    notes,
    dateTime,
  });
};

export {
  createAppointment,
  getAppointmentList,
  updateAppointment,
  deleteAppointment,
};
