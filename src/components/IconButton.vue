<script setup lang="ts">
import { defineProps } from "vue";

type IconButtonProps = {
    onClick: () => void
    icon: string
}

const { onClick, icon } = defineProps<IconButtonProps>();

const iconClass = `pi ${icon}`
</script>

<template>
    <div className="p-4 rounded-full bg-blue cursor-pointer" @click="onClick">
        <i :class='iconClass' style="color: white; display: block"></i>
    </div>
</template>