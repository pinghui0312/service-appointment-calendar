<script setup lang="ts">
import Appointment from "./components/Appointment.vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import Logo from "./assets/logo.svg?url";
import "@aws-amplify/ui-vue/styles.css";

Amplify.configure(outputs);
</script>

<template>
  <authenticator className="h-dvh flex flex-row items-center justify-center">
    <template v-slot="{ user, signOut }">
      <div
        className="fixed top-0 flex flex-row bg-white w-full justify-center p-4 shadow-[0_0.2rem_0.8rem_0_rgba(0,0,0,0.1)]"
      >
        <div
          className="flex flex-row justify-between items-center w-full max-w-[1440px]"
        >
          <div className="flex flex-row gap-4 items-center">
            <img className="h-10" :src="Logo" alt="logo" />
            <h2>Welcome back, {{ user.signInDetails.loginId }}!</h2>
          </div>
          <button className="btn" @click="signOut">Sign Out</button>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-20 w-full">
        <Appointment />
      </div>
    </template>
  </authenticator>
</template>
