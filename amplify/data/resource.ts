import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Appointment: a
    .model({
      dentistName: a.string().required(),
      equipment: a.string().required(),
      notes: a.string(),
      technicianId: a.id().required(),
      dateTime: a.datetime().required(),
    })
    .secondaryIndexes((index) => [index("technicianId").sortKeys(["dateTime"])])
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
