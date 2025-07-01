<script setup lang="ts">
import AppointmentPage from "./pages/Appointment.vue";
import Header from "./components/Header.vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-vue/styles.css";
import 'primeicons/primeicons.css';

Amplify.configure(outputs);
</script>

<template>
  <authenticator className="h-dvh flex flex-row items-center justify-center">
    <template v-slot="{ user, signOut }">
      <Header :signOut="signOut" :name="user.signInDetails.loginId" />
      <div className="flex flex-col items-center mt-20 w-full">
        <AppointmentPage :userId="user.userId" />
      </div>
    </template>
  </authenticator>
</template>
