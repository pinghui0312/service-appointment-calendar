<script setup lang="ts">
import {defineProps} from 'vue';
import Logo from "../assets/logo.svg?url";

const props = defineProps({
  signOut: {
    default: undefined
  },
  name: {
    default: ""
  }
});
</script>

<template>
    <div
        className="fixed top-0 flex flex-row bg-white w-full justify-center p-4 shadow-[0_0.2rem_0.8rem_0_rgba(0,0,0,0.1)]">
        <div className="flex flex-row justify-between items-center w-full max-w-[1440px]">
            <div className="flex flex-row gap-4 items-center">
                <img className="h-10" :src="Logo" alt="logo" />
                <h2 className="text-black tab:block hidden">Welcome back, {{ name }}!</h2>
            </div>
            <button className="btn" @click="props.signOut">Sign Out</button>
        </div>
    </div>
</template>